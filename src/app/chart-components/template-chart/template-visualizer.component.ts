import { Component, Input, EventEmitter, ViewChild, Output, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Radar } from 'src/model/radar';
import { Statistics } from 'src/model/statistics';
import { Answer } from 'src/model/answer';
import { RadarChartComponent } from '../radar-chart/radar-chart.component';

@Component({
  selector: 'app-template-visualizer',
  templateUrl: './template-visualizer.component.html',
  styleUrls: ['./template-visualizer.component.scss']
})
export class RadarTemplateVisualizerComponent implements OnInit{

  @ViewChild('radarChart') chart: RadarChartComponent;
  @Input() radars: Radar[];
  @Input() isPreview: Boolean;
  @Output() onRadarSelected = new EventEmitter<Radar>();
  @Output() onAxieSelected = new EventEmitter<number>();

  selectedRadarIndex = 0;
  selectorDotSize = 1.3
  selectorWidth =  15
  selectorLabelPaddingTop = 1
  hideSelector=false

  constructor() {

   }

  ngOnInit(): void {
    const numberOfRadars = this.radars.length
    if(numberOfRadars<=1){
      this.hideSelector = true
      return
    } 
    
    this.selectorWidth = this.selectorWidth + numberOfRadars * 5
    this.selectorDotSize = this.selectorDotSize - 0.05 * numberOfRadars

    this.selectorWidth = this.selectorWidth>80 ? 80 : this.selectorWidth
    this.selectorDotSize = this.selectorDotSize<0.5 ? 0.5 : this.selectorDotSize
    this.selectorLabelPaddingTop = this.selectorDotSize + .6
    this.selectedRadarIndex = this.radars.length-1  
    this.onRadarSelected.emit(this.selectedRadar())
  }

  selectedRadar(){
    return this.radars[this.selectedRadarIndex]
  }

  selectRadar(index){
    this.selectedRadarIndex = index
    this.chart.update([this.selectedRadar()])
    this.onRadarSelected.emit(this.selectedRadar())
  }

  isRadarSelected(radar){
    return radar.id === this.radars[this.selectedRadarIndex].id
  }

  setRadarAxisIndexSelection(axieIndex){
    this.onAxieSelected.emit(this.selectedRadar().axes[axieIndex].id)
  }
}
