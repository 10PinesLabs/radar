import { Component, OnInit, Inject } from '@angular/core';
import { RadarTemplateService } from 'src/services/radarTemplate.service';
import { Radar } from 'src/model/radar';
import { RadarTemplate } from "../../model/radarTemplate";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  radars: Radar[];
  radarTemplates: RadarTemplate[];

  constructor(@Inject('RadarTemplateService') private radarTemplateService: RadarTemplateService) {
    this.radarTemplates = [];
  }

  ngOnInit() {
    this.radarTemplateService.getAll().subscribe(radarTemplates => {
      radarTemplates.forEach( radarTemplate => {
        this.radarTemplates.push(new RadarTemplate(radarTemplate.id, radarTemplate.name,
          radarTemplate.description, radarTemplate.axes, radarTemplate.active, radarTemplate.radars))
      })
    });
  }
}
