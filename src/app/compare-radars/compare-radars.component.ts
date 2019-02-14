import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompareRadarsService } from 'src/services/compare-radars.service';
import { Radar } from 'src/model/radar';


@Component({
  selector: 'app-compare-radars',
  templateUrl: './compare-radars.component.html',
  styleUrls: ['./compare-radars.component.scss']
})
export class CompareRadarsComponent implements OnInit {

  firstRadar: Radar;
  secondRadar: Radar;

  constructor(private compareRadarsService: CompareRadarsService, private router: Router) { }

  ngOnInit() {
    this.compareRadarsService.firstRadar().subscribe(firstRadar => this.firstRadar = firstRadar);
    this.compareRadarsService.secondRadar().subscribe(secondRadar => this.secondRadar = secondRadar);

    // TODO: si no hay radares debería llevar a la pagina de select-to-compare
  }

  title() {
    return 'Comparación entre ' + this.firstRadar.title + ' y ' + this.secondRadar.title;
  }

  parseRadarsToRadarChart() {
    return [this.firstRadar, this.secondRadar];
  }
}
