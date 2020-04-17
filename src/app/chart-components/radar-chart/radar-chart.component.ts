import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Radar } from 'src/model/radar';
import { Statistics } from 'src/model/statistics';
import { Axis } from 'src/model/axis';
import { Answer } from 'src/model/answer';


@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements AfterViewInit {

  @ViewChild('radarChartId', { static: false }) canvasRef: ElementRef;
  @Input() radars: Radar[];
  @Input() axesNames: String[];
  radarChart = [];
  greenBorderColor = 'rgba(25, 179, 112, 1)';
  greenBackgroundColor = 'rgba(157, 217, 191, 0.6)';
  violetBorderColor = 'rgba(35, 25, 179, 1)';
  violetBackgroundColor = 'rgba(159, 155, 217, 0.6)';

  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.createRadarChart();
    });
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
      labels: this.axesNames,
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
      if (this.axesNames.includes(axis.name)) {
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
      radius: 6,
      pointRadius: 6,
      pointBorderWidth: 3,
      pointBackgroundColor: radarBackgroundColor,
      pointBorderColor: radarBorderColor,
      pointHoverRadius: 10,
      data: axisMean,
    };
  }

  private parseRadarOptions() {
    return {
      responsive: true,
      scale: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 5,
          stepSize: 1,
        },
        pointLabels: {
          fontSize: 18,
        }
      },
      legend: {
        display: true,
      },
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
