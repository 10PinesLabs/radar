import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Axis } from 'src/model/axis';

@Component({
  selector: 'app-axis-bar-chart',
  templateUrl: './axis-bar-chart.component.html',
  styleUrls: ['./axis-bar-chart.component.css']
})
export class AxisBarChartComponent implements AfterViewInit {

  @ViewChild('barChartId') canvasRef: ElementRef;
  @Input() axis: Axis;
  @Input() values;
  barChart = [];

  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.createBarChart();
    });
  }

  createBarChart() {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    const barData = this.parseBarData();
    const barOptions = this.parseBarOptions();

    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: barData,
      options: barOptions,
    });
  }

  private parseBarData() {
    const arrayValues = this.axisValuesObjToArray();

    return {
      labels: [1, 2, 3, 4, 5],
      datasets: [{
          label: this.axis.title,
          backgroundColor: 'rgba(157, 217, 191, 0.6)',
        borderColor: 'rgba(25, 179, 112, 1)',
          data: arrayValues,
      }]
    };
  }

  private parseBarOptions() {
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
    const axisValuesArray = [];
    [1, 2, 3, 4, 5].forEach(field => axisValuesArray.push(this.values[field]) );
    return axisValuesArray;
  }
}
