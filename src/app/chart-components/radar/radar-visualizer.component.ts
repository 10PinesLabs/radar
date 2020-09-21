import { Component, Input, EventEmitter, ViewChild, Output, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Radar } from 'src/model/radar';
import { Statistics } from 'src/model/statistics';
import { Answer } from 'src/model/answer';
import { RadarChartComponent } from '../radar-chart/radar-chart.component';


@Component({
  selector: 'app-radar-visualizer',
  templateUrl: './radar-visualizer.component.html',
  styleUrls: ['./radar-visualizer.component.scss']
})
export class RadarVisualizerComponent implements OnInit{

  @ViewChild('radarChart') chart: RadarChartComponent;
  @Input() radars: Radar[];
  @Input() showLabels: Boolean;
  @Output() onRadarSelected = new EventEmitter<Radar>();

  selectedRadarIndex = 0;
  selectorDotSize = 1.3
  selectorWidth =  15
  selectorLabelPaddingTop = 1

  constructor() {

   }

  ngOnInit(): void {


    const numberOfRadars = this.radars.length
    this.selectorWidth = this.selectorWidth + numberOfRadars * 10
    this.selectorDotSize = this.selectorDotSize - 0.05 * numberOfRadars

    this.selectorWidth = this.selectorWidth>80 ? 80 : this.selectorWidth
    this.selectorDotSize = this.selectorDotSize<0.5 ? 0.5 : this.selectorDotSize
    this.selectorLabelPaddingTop = this.selectorDotSize + .6
  }

  selectedRadar(){
    return this.radars[this.selectedRadarIndex]
  }

  radarSelected(index){
    this.selectedRadarIndex = index
    this.chart.update([this.selectedRadar()])
    this.onRadarSelected.emit(this.selectedRadar())
  }

  isRadarSelected(radar){
    return radar.id === this.radars[this.selectedRadarIndex].id
  }
}
