import {Component, Input, OnInit} from '@angular/core';
import {RadarTemplate} from "../../../model/radarTemplate";

@Component({
  selector: 'app-header-filters',
  templateUrl: './header-filters.component.html',
  styleUrls: ['./header-filters.component.scss']
})
export class HeaderFiltersComponent implements OnInit {

  @Input() radarTemplates: RadarTemplate[];

  constructor() {
  }

  ngOnInit() {
  }
}
