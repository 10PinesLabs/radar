import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Radar } from 'src/model/radar';
import { Statistics } from 'src/model/statistics';


@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements AfterViewInit {

  @ViewChild('radarChartId') canvasRef: ElementRef;
  @Input() radars: Radar[];
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
    const axisLabels = [];

    // TODO: que pasa cuando los radares tienen aristas distintas?
    this.radars[0].axisValues().forEach(axisValue => axisLabels.push(axisValue[0].title));

    if (this.radars.length === 1) {
      const dataset = this.datasetFromRadar(this.radars[0], this.greenBackgroundColor, this.greenBorderColor);
      radarDatasets.push(dataset);
    } else {
      const firstRadarDataset = this.datasetFromRadar(this.radars[0], this.greenBackgroundColor, this.greenBorderColor);
      const secondRadarDataset = this.datasetFromRadar(this.radars[1], this.violetBackgroundColor, this.violetBorderColor);
      radarDatasets.push(firstRadarDataset);
      radarDatasets.push(secondRadarDataset);
    }

    return {
      labels: axisLabels,
      datasets: radarDatasets
    };
  }

  private datasetFromRadar(radar: Radar, backgroundColor: String, borderColor: String) {
    const radarLabel = radar.title;
    const radarBackgroundColor = backgroundColor;
    const radarBorderColor = borderColor;
    const axisValues = radar.axisValues();

    const axisLabels = [];
    const axisMean = [];
    axisValues.forEach(axisValue => {
      const axisTitle = axisValue[0].title;
      const mean = this.meanFor(axisValue[1]);
       axisLabels.push(axisTitle);
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

  private meanFor(axisValues) {
    const statistics = new Statistics(axisValues);
    return statistics.mean();
  }
}
