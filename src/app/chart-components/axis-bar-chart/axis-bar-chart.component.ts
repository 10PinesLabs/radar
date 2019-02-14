import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Axis } from 'src/model/axis';
import { Statistics } from 'src/model/statistics';

@Component({
  selector: 'app-axis-bar-chart',
  templateUrl: './axis-bar-chart.component.html',
  styleUrls: ['./axis-bar-chart.component.css']
})
export class AxisBarChartComponent implements AfterViewInit {

  @ViewChild('chartId') canvasRef: ElementRef;
  @Input() axis: Axis;
  @Input() values;
  chart = [];

  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.createChart();
    });
  }

  createChart() {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    const chartDataset = this.chartDataset();
    const chartOptions = this.chartOptions();

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: chartDataset,
      options: chartOptions,
    });
  }

  private chartDataset() {
    const chartDataset = {
      labels: [1, 2, 3, 4, 5],
      datasets: [
        this.barDataset(),
      ]
    };

    return chartDataset;
  }

  private barDataset() {
    const arrayValues = this.axisValuesObjToArray();
    const barDataset = {
      label: '#Votos',
      backgroundColor: 'rgba(157, 217, 191, 0.6)',
      borderColor: 'rgba(25, 179, 112, 1)',
      data: arrayValues,
    };

    return barDataset;
  }

  private chartOptions() {
    return {
      responsive: true,
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                steps: 5,
                stepValue: 1,
                max: 5
                }
            }]
        },
      legend: {
        display: true,
      },
    };
  }

  private axisValuesObjToArray() {
    const statistics = new Statistics(this.values);
    return statistics.axisValuesObjToArray();
  }

}
