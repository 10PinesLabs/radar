import { Component, Input, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Chart } from 'chart.js';
import { Radar } from 'src/model/radar';
import { Statistics } from 'src/model/statistics';
import { Answer } from 'src/model/answer';


@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements AfterViewInit {

  @ViewChild('radarChartId') canvasRef: ElementRef;
  @Input() radars: Radar[];
  @Input() axesNames: String[];
  @Input() isPreview: Boolean = true;
  @Input() showLabels: Boolean = true;
  @Output() onRadarAxisSelected: EventEmitter<number> = new EventEmitter<number>();

  radarChart:Chart = {destroy: ()=>{}, data:()=>{}};
  greenBorderColor = 'rgba(25, 179, 112, 1)';
  greenBackgroundColor = 'rgba(157, 217, 191, 0.6)';
  violetBorderColor = 'rgba(35, 25, 179, 1)';
  violetBackgroundColor = 'rgba(159, 155, 217, 0.6)';
  selectedAxieBorderColor = "#1C7CD5";
  selectedAxieBackgroundColor = "#DCEDF6";

  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.createRadarChart();
    });
  }

  update(radars){
    this.radars = radars
    this.radarChart.destroy()
    this.createRadarChart()
  }

  createRadarChart() {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    const radarData = this.parseRadarData();
    const radarOptions = this.parseRadarOptions();
     this.radarChart = new Chart(ctx, {
      type: 'radar',
      data: radarData,
      options: radarOptions,
    });
  }

  private parseRadarData() {
    const radarDatasets = [];

    const firstRadarDataset = this.datasetFromRadar(this.radars[0], this.greenBackgroundColor, this.greenBorderColor);
    radarDatasets.push(firstRadarDataset);
    if (this.isComparingRadars()) {
      const secondRadarDataset = this.datasetFromRadar(this.radars[1], this.violetBackgroundColor, this.violetBorderColor);
      radarDatasets.push(secondRadarDataset);
    }

    return {
      labels: this.axesNames || this.radars[0].axes.map(axis => axis.name),
      datasets: radarDatasets
    };
  }

  private isComparingRadars() {
    return this.radars.length === 2;
  }

  private datasetFromRadar(radar: Radar, backgroundColor: String, borderColor: String) {
    const radarLabel = radar.name + ' (Media)';
    const radarBackgroundColor = backgroundColor;
    const radarBorderColor = borderColor;
    const axisValues = radar.axes.map(axis => {
      if (!this.axesNames || this.axesNames.includes(axis.name)) {
        return {
          name: axis.name,
          points: this.parseAxisPoints(axis.answers),
        };
      }
    });

    const axisLabels = [];
    const axisMean = [];
    axisValues.forEach(axisValue => {
      const axisName = axisValue.name;
      const mean = this.meanFor(axisValue.points);
       axisLabels.push(axisName);
      axisMean.push(mean);
    });

    return {
      label: radarLabel,
      backgroundColor: radarBackgroundColor,
      borderColor: radarBorderColor,
      fill: true,
      radius: 7,
      pointHitRadius: 25,
      borderWidth:2.5,
      pointBorderWidth: 2.5,
      pointHoverBorderWidth:2.5,
      pointHoverRadius:9.3,
      pointBackgroundColor: [],
      pointBorderColor: [],
      pointRadius: [],
      data: axisMean,
    };
  }
  
  private onAxieSelected = (event,chartElements) => {
    const axis = chartElements[0];
    if(axis){
      const axisIndex = axis._index;
      this.onRadarAxisSelected.emit(axisIndex)
      this.radarChart.data.datasets[0].pointBorderColor = []
      this.radarChart.data.datasets[0].pointBackgroundColor = []
      this.radarChart.data.datasets[0].pointRadius = []
      this.radarChart.data.datasets[0].pointBorderWidth = []

      this.radarChart.data.datasets[0].pointBorderColor[axisIndex] = this.selectedAxieBorderColor
      this.radarChart.data.datasets[0].pointBackgroundColor[axisIndex] = this.selectedAxieBackgroundColor

      const selectedPointRadius = this.radarChart.data.datasets[0].radius * 1.2
      this.radarChart.data.datasets[0].pointRadius[axisIndex] = selectedPointRadius

      this.radarChart.options.scale.pointLabels.fontColor = []
      this.radarChart.options.scale.pointLabels.fontColor[axisIndex] = this.selectedAxieBorderColor
      this.radarChart.update();
    }
  }

  private parseRadarOptions() {
    return {
      responsive: true, 
      maintainAspectRatio: true,
      aspectRatio:1,
      onClick: this.onAxieSelected,
      scale: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 5,
          stepSize: 1,
        },
        pointLabels: {
          fontSize: 18,
          display: this.showLabels,
        }
      },
      legend: {
        display: false,
      },
      animation:{
        duration:500,
      },
      tooltips:{
        enabled :false
      },
      events: !this.isPreview ? ['click','mousemove', 'mouseout',] : []
    };
  }

  private parseAxisPoints(answers: Array<Answer>) {
    return answers.map(answer => answer.points);
  }

  private meanFor(axisValues) {
    const statistics = new Statistics(axisValues);
    return statistics.mean();
  }
}
