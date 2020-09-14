import { Component, OnInit, Input } from '@angular/core';
import { RadarTemplate } from 'src/model/radarTemplate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-radar-template-index-details',
  templateUrl: './radar-template-index-details.component.html',
  styleUrls: ['./radar-template-index-details.component.scss']
})
export class RadarTemplateIndexDetailsComponent implements OnInit {

  @Input() radarTemplate: RadarTemplate;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  navigateToRadarTemplate = () => {
    this.router.navigate(['radarTemplate', this.radarTemplate.id]);
  }

}
