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
  @Input() radar: Radar;
  radarChart = [];

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
    const radarLabel = this.radar.title;
    const radarBackgroundColor = 'rgba(157, 217, 191, 0.6)';
    const radarBorderColor = 'rgba(25, 179, 112, 1)';
    const axisValues = this.radar.axisValues();

    const axisLabels = [];
    const axisMean = [];
    axisValues.forEach(axisValue => {
      const axisTitle = axisValue[0].title;
      const mean = this.meanFor(axisValue[1]);
       axisLabels.push(axisTitle);
      axisMean.push(mean);
    });

    return {
      labels: axisLabels,
      datasets: [{
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
      }]
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
