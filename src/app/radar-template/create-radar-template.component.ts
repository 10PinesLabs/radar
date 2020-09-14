import { Component, OnInit, Inject } from '@angular/core';
import { Axis } from 'src/model/axis';
import { Router, ActivatedRoute } from '@angular/router';
import {RadarTemplateService} from "../../services/radarTemplate.service";

@Component({
  selector: 'app-create-radar-template',
  templateUrl: './create-radar-template.component.html',
  styleUrls: ['./create-radar-template.component.scss']
})
export class CreateRadarTemplateComponent implements OnInit {

  axes: Axis[] = [];
  radarTemplateName = '';
  radarTemplateDescription = '';
  showErrors = false;

  constructor(@Inject('RadarTemplateService') private radarTemplateService: RadarTemplateService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const strId = params.get('id');
      if (strId !== null) {
        //this.radarTemplateService.create(parseInt(strId, 10)).subscribe(result => {
          //debugger;
          //this.radarTemplateName = result.radar.name;
          //this.radarTemplateDescription = result.radar.description;
          //this.axes = result.radar.axes.map(axis => new Axis(null, axis.name, axis.description, []));
        //});
      }
    });
  }

  radarTemplateIsInvalid(): boolean {
    return this.radarTemplateNameIsEmpty() || this.radarTemplateDescriptionIsEmpty()
      || this.radarTemplateAxesIsLessThanThree();
  }

  createRadarTemplate() {
    if (this.radarTemplateIsInvalid()) {
      this.showErrors = true;
    } else {
     // const newRadarTemplate = new RadarTemplate(null, this.radarTemplateName, this.radarTemplateDescription, this.axes, null);
     // this.radarTemplateService.createRadarTemplate(newRadarTemplate).subscribe(() => this.router.navigate(['/radarTemplates']));
    }
  }

  backToIndex() {
    this.router.navigate(['/radarTemplates']);
  }

  private radarTemplateNameIsEmpty(): boolean {
    return this.radarTemplateName.length === 0;
  }

  private radarTemplateDescriptionIsEmpty(): boolean {
    return this.radarTemplateDescription.length === 0;
  }

  private radarTemplateAxesIsLessThanThree(): boolean {
    return this.axes.length < 3;
  }
}
