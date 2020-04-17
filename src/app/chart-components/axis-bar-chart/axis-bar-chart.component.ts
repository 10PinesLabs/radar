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

  @ViewChild('chartId', { static: false }) canvasRef: ElementRef;
  @Input() axis: Axis;
  @Input() values;
  @Input() radarNames;
  chart = [];
  greenBorderColor = 'rgba(25, 179, 112, 1)';
  greenBackgroundColor = 'rgba(157, 217, 191, 0.6)';
  violetBorderColor = 'rgba(35, 25, 179, 1)';
  violetBackgroundColor = 'rgba(159, 155, 217, 0.6)';

  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.createChart();
    });
  }

  createChart() {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    const chartDatasets = this.chartDatasets();
    const chartOptions = this.chartOptions();

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: chartDatasets,
      options: chartOptions,
    });
  }

  private chartDatasets() {
    const chartDataset = {
      labels: [1, 2, 3, 4, 5],
      datasets: this.generateDatasets(),
    };

    return chartDataset;
  }

  private generateDatasets() {
    const datasets = [];
    datasets.push(this.barDataset(this.values[0], this.radarNames[0], this.greenBackgroundColor, this.greenBorderColor));
    if (this.isComparingRadars()) {
      datasets.push(this.barDataset(this.values[1], this.radarNames[1], this.violetBackgroundColor, this.violetBorderColor));
    }

    return datasets;
  }

  private isComparingRadars() {
    return this.values.length === 2;
  }

  private barDataset(values, radarTitle, backgroundColor: String, borderColor: String) {
    const arrayValues = this.axisValuesObjToArray(values);
    const barDataset = {
      label: radarTitle,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
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
                }
            }]
        },
      legend: {
        display: true,
      },
    };
  }

  private axisValuesObjToArray(values) {
    const statistics = new Statistics(values);
    return statistics.axisValuesObjToArray();
  }

}
