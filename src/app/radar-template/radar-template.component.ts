import {Component, OnInit, Input, Inject} from '@angular/core';
import { RadarTemplate } from 'src/model/radarTemplate';
import {RadarTemplateService} from "../../services/radarTemplate.service";
import {ActivatedRoute} from "@angular/router";
import {Radar} from "../../model/radar";

@Component({
  selector: 'app-radar-template',
  templateUrl: './radar-template.component.html',
  styleUrls: ['./radar-template.component.scss']
})
export class RadarTemplateComponent implements OnInit {

  @Input() radarTemplate: RadarTemplate;
  id: String;

  constructor(@Inject('RadarTemplateService') private radarTemplateService: RadarTemplateService,
              private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get("id")
  }

  ngOnInit() {
    this.radarTemplateService.get(this.id).subscribe(radarTemplate => {
      this.radarTemplate = new RadarTemplate(radarTemplate.id, radarTemplate.name,
        radarTemplate.description, radarTemplate.axes, radarTemplate.active, radarTemplate.radars)
    });
  }

}
