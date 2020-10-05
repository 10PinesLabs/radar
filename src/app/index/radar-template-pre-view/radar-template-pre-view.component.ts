import { Component, OnInit, Input } from '@angular/core';
import { RadarTemplate } from 'src/model/radarTemplate';

@Component({
  selector: 'app-radar-template-pre-view',
  templateUrl: './radar-template-pre-view.component.html',
  styleUrls: ['./radar-template-pre-view.component.scss']
})
export class RadarTemplatePreViewComponent implements OnInit {

  @Input() radarTemplate: RadarTemplate;

  constructor() {
  }

  ngOnInit() {
  }

}
