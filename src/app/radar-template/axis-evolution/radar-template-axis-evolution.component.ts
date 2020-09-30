import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { RadarTemplate } from 'src/model/radarTemplate';
import { RadarTemplateAxisEvolutionLineChartComponent } from './charts/line-chart/radar-template-axis-evolution-line-chart.component';

@Component({
  selector: 'app-radar-template-axis-evolution',
  templateUrl: './radar-template-axis-evolution.component.html',
  styleUrls: ['./radar-template-axis-evolution.component.scss']
})
export class RadarTemplateAxisEvolutionComponent implements OnInit, OnChanges{
  @Input() radarTemplate: RadarTemplate;
  @Input() selectedAxisId: Number ;
  @ViewChild(RadarTemplateAxisEvolutionLineChartComponent) axisEvolutionLineChart : RadarTemplateAxisEvolutionLineChartComponent

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes.selectedAxisId.firstChange && this.selectedAxisId)
      this.axisEvolutionLineChart?.updateChart(this.selectedAxisId)
  }

  axisName() {
    if(this.selectedAxisId){
      return this.radarTemplate.radars[0].axes.filter(axis => axis.id === this.selectedAxisId)[0].name;
    }
    return "No se selecciono ningun eje"
  }

  ngOnInit(): void {
  }

}
