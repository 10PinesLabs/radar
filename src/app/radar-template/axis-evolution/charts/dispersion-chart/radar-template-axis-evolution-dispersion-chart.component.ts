import {Component, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { RadarTemplate } from 'src/model/radarTemplate';
import { Chart } from 'chart.js';
import {CHART_COLORS, POINTS_RANGE} from "../../radar-template-axis-evolution.component";

@Component({
  selector: 'app-axis-evolution-dispersion-chart',
  templateUrl: './radar-template-axis-evolution-dispersion-chart.component.html',
  styleUrls: ['./radar-template-axis-evolution-dispersion-chart.component.scss']
})
export class RadarTemplateAxisEvolutionDispersionChartComponent implements AfterViewInit {

  @ViewChild('axisEvolutionDispersionChartId') dispersionCanvasRef: ElementRef;
  @Input() radarTemplate: RadarTemplate;
  @Input() selectedAxisId: Number;
  axisEvolutionDispersionChart = [];

  constructor() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.createAxisEvolutionDispersionChart();
    });
  }

  private createAxisEvolutionDispersionChart() {
    const ctx = this.dispersionCanvasRef.nativeElement.getContext('2d');
    const axisEvolutionLineChartData = this.parseAxisEvolutionDispersionChartData();
    this.axisEvolutionDispersionChart = new Chart(ctx, {
      type: 'line',
      fillOpacity: .3,
      data: axisEvolutionLineChartData,
      options: {
        responsive: true, 
        maintainAspectRatio: false,
        legend: {
          position: "bottom",
          align: "middle"
        },
        scales: {
          yAxes: [{
            stacked: true,
            ticks: {
              min: 0,
              max: 100,
              stepSize: 10,
            },
          }]
        }
      }
    });
  }

  private parseAxisEvolutionDispersionChartData() {
    const dataset = this.radarTemplate.radars.map( radar => {
      const radarAnswersForSelectedAxis = radar.axes.filter(axis => axis.id === this.selectedAxisId)[0].answers
      const groupedAnswers = Array.from({length: POINTS_RANGE}, _ => 0);

      radarAnswersForSelectedAxis.forEach( answer => {
        groupedAnswers[answer.points - 1] = groupedAnswers[answer.points -1] + 1;
      });
      const amountOfAnswers = radarAnswersForSelectedAxis.length;
      return groupedAnswers.map(summedAnswers => summedAnswers * 100 / amountOfAnswers);
    });

    const labels = this.radarTemplate.radars.map( radar => radar.name );
    const finalDataset = dataset.map((_, index) => this.generateDatasetConfigurationFor(dataset, index + 1));
    return {
      labels: labels,
      datasets: finalDataset,
    }
  }

  private mapPointToColor(point){
    switch (point) {
      case 1: return CHART_COLORS.red;
      case 2: return CHART_COLORS.orange;
      case 3: return CHART_COLORS.yellow;
      case 4: return CHART_COLORS.lightGreen;
      case 5: return CHART_COLORS.green;
    }
  }

  private mapPointToBackgroundColor(point){
    switch (point) {
      case 1: return CHART_COLORS.transparentRed;
      case 2: return CHART_COLORS.transparentOrange;
      case 3: return CHART_COLORS.transparentYellow;
      case 4: return CHART_COLORS.transparentLightGreen;
      case 5: return CHART_COLORS.transparentGreen;
    }
  }

  private generateDatasetConfigurationFor(dataset, point) {
    return {
      label: point.toString(),
      data: this.getDatasetFor(dataset, point - 1),
      spanGaps: true,
      borderColor: this.mapPointToColor(point),
      backgroundColor: this.mapPointToBackgroundColor(point),
      fill: true,
      lineTension: 0,
    }
  }

  private getDatasetFor(originalDataset, datasetIdentifier) {
    return originalDataset.map(data => data[datasetIdentifier]);
  }

}
