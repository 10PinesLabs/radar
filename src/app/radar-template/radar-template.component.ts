import {Component, OnInit, Input, Inject, ViewChild} from '@angular/core';
import { RadarTemplate } from 'src/model/radarTemplate';
import {RadarTemplateService} from "../../services/radarTemplate.service";
import {ActivatedRoute} from "@angular/router";
import { FitTextDirective } from '../commons/directives/fittext.directive';
import {Router} from "@angular/router";

@Component({
  selector: 'app-radar-template',
  templateUrl: './radar-template.component.html',
  styleUrls: ['./radar-template.component.scss']
})
export class RadarTemplateComponent implements OnInit {
  @ViewChild(FitTextDirective) textFitter : FitTextDirective;
  @Input() radarTemplate: RadarTemplate;
  id: String;
  selectedRadar = null
  
  constructor(@Inject('RadarTemplateService') private radarTemplateService: RadarTemplateService,
              private route: ActivatedRoute,  private router: Router) {
    this.id = this.route.snapshot.paramMap.get("id")
  }

  ngOnInit() {
    this.radarTemplateService.get(this.id).subscribe(radarTemplate => {
      this.radarTemplate = new RadarTemplate(radarTemplate.id, radarTemplate.name,
        radarTemplate.description, radarTemplate.axes, radarTemplate.active, radarTemplate.radars)
    });
  }

  radars(){
    return this.radarTemplate.radars
  }

  setSelectedRadar(radar){
    this.selectedRadar = radar
  }

  viewRadar(){
    const radarUrl = `radar/${this.selectedRadar.id}/results`
    console.log(radarUrl)
    this.router.navigate([radarUrl]);
  }

}
