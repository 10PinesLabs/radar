import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Radar } from 'src/model/radar';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements AfterViewInit {

  @ViewChild('radarChartId') canvasRef: ElementRef;
  // @Input() radar: Radar;
  radarChart = [];

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.createRadarChart();
    });
  }

  createRadarChart() {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    const data = {
      labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
      datasets: [{
        label: 'Student A',
        backgroundColor: 'rgba(157, 217, 191, 0.6)',
        borderColor: 'rgba(25, 179, 112, 1)',
        fill: true,
        radius: 6,
        pointRadius: 6,
        pointBorderWidth: 3,
        pointBackgroundColor: 'rgba(157, 217, 191, 0.6)',
        pointBorderColor: 'rgba(25, 179, 112, 1)',
        pointHoverRadius: 10,
        data: [20, 10, 4, 2],
      }]
    };

    const options = {
      startAngle: -Math.PI / 4,
      legend: {
        display: false
      },
    };

    this.radarChart = new Chart(ctx, {
      type: 'radar',
      data: data,
      options: options,
    });
  }
}
