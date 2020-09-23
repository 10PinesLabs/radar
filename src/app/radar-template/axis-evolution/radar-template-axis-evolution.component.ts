import {Component, Input, OnInit} from '@angular/core';
import { RadarTemplate } from 'src/model/radarTemplate';

export const CHART_COLORS = {
  green: 'rgb(72, 129, 9, 1)',
  transparentGreen: 'rgb(72, 129, 9, 0.4)',
  lightGreen: 'rgb(144, 238, 144)',
  transparentLightGreen: 'rgb(144, 238, 144, 0.4)',
  yellow: 'rgb(250, 238, 45)',
  transparentYellow: 'rgb(250, 238, 45, 0.4)',
  orange: 'rgb(242, 165, 51)',
  transparentOrange: 'rgb(242, 165, 51, 0.4)',
  red: 'rgb(230, 63, 54)',
  transparentRed: 'rgb(230, 63, 54, 0.4)',
}

export const POINTS_RANGE = 5;

@Component({
  selector: 'app-radar-template-axis-evolution',
  templateUrl: './radar-template-axis-evolution.component.html',
  styleUrls: ['./radar-template-axis-evolution.component.scss']
})
export class RadarTemplateAxisEvolutionComponent implements OnInit {
  @Input() radarTemplate: RadarTemplate;
  @Input() selectedAxisId: Number;

  constructor() {
  }

  axisName() {
    return this.radarTemplate.radars[0].axes.filter(axis => axis.id === this.selectedAxisId)[0].name;
  }

  ngOnInit(): void {
  }

}
