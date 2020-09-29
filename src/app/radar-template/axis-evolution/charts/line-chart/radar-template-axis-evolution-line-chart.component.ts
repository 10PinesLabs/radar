import {Component, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { RadarTemplate } from 'src/model/radarTemplate';
import { Chart } from 'chart.js';
import {CHART_COLORS} from "../../radar-template-axis-evolution.component";

@Component({
  selector: 'app-axis-evolution-line-chart',
  templateUrl: './radar-template-axis-evolution-line-chart.component.html',
  styleUrls: ['../radar-template-axis-chart-styles.scss']
})
export class RadarTemplateAxisEvolutionLineChartComponent implements AfterViewInit {

  @ViewChild('axisEvolutionLineChartId') lineCanvasRef: ElementRef;
  @Input() radarTemplate: RadarTemplate;
  @Input() selectedAxisId: Number;
  axisEvolutionLineChart = { destroy: ()=>{}};

  constructor() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.createAxisEvolutionLineChart();
    });
  }

  updateChart(axisId){
    this.selectedAxisId = axisId;
    this.axisEvolutionLineChart.destroy()
    this.createAxisEvolutionLineChart()
  }

  private createAxisEvolutionLineChart() {
    const ctx = this.lineCanvasRef.nativeElement.getContext('2d');
    const axisEvolutionLineChartData = this.parseAxisEvolutionLineChartData();
    this.axisEvolutionLineChart = new Chart(ctx, {
      type: 'line',
      data: axisEvolutionLineChartData,
      options: {
        responsive: true, 
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              max: 5,
              stepSize: 1,
            },
          }]
        }
      }
    });
  }


  private parseAxisEvolutionLineChartData() {
    const dataset = this.radarTemplate.radars.map( radar => {
      const radarAnswers = radar.axes.filter(axis => axis.id === this.selectedAxisId)[0].answers
      return this.average(radarAnswers.map(answer => answer.points))
    })
    const labels = this.radarTemplate.radars.map( radar => radar.name );
    return {
      labels: labels,
      datasets: [
        {
          data: dataset,
          spanGaps: true,
          borderColor: CHART_COLORS.lightGreen,
          backgroundColor: CHART_COLORS.transparentLightGreen,
          fill: true,
          lineTension: 0,
        }
      ],
    }
  }

  private average = arr => arr.length === 0 ? arr.length :  arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

}
