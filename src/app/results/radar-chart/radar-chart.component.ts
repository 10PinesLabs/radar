import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Radar } from 'src/model/radar';
import { Axis } from 'src/model/axis';

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
    const axisMedians = [];
    axisValues.forEach(axisValue => {
      const axisTitle = axisValue[0].title;
      const median = this.medianFor(axisValue[1]);

      axisLabels.push(axisTitle);
      axisMedians.push(median);
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
        data: axisMedians,
      }]
    };
  }

  private parseRadarOptions() {
    return {
      legend: {
        display: true,
      },
    };
  }

  private axisValuesObjToArray(axisValues) {
    const axisValuesArray = [];
    [1, 2, 3, 4, 5].forEach(field => axisValuesArray.push(axisValues[field]) );
    return axisValuesArray;
  }

  private medianFor(axisValues) {
    const values = this.axisValuesObjToArray(axisValues);
    let median;

    if (values.length === 0) {
      median =  0;
    } else {
      const m = values.length / 2;
      median = values.length % 2 === 0 ? (values[m] + values[m - 1]) / 2 : values[m];
    }

    return median;
  }
}
