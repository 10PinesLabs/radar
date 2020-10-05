import { Component, OnInit, Input } from '@angular/core';
import { RadarTemplate } from 'src/model/radarTemplate';

@Component({
  selector: 'app-radar-template-card',
  templateUrl: './radar-template-card.component.html',
  styleUrls: ['./radar-template-card.component.scss']
})
export class RadarTemplateCardComponent implements OnInit {

  @Input() radarTemplate: RadarTemplate;

  constructor() {
  }

  ngOnInit() {
  }

  radars(){
    return this.radarTemplate.radars
  }

}
