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
    this.redirectToSelectToCompareIfThereAreNotRadars();
  }

  title() {
    return 'Comparación entre ' + this.firstRadar.name + ' y ' + this.secondRadar.name;
  }

  axesInCommon() {
    const axesInCommon = [];
    this.firstRadar.axes.forEach(firstRadarAxis => {
      if (this.secondRadar.axisBelongsToRadar(firstRadarAxis)) {
        axesInCommon.push(firstRadarAxis);
      }
    });

    return axesInCommon;
  }

  parseRadarsToRadarChart() {
    return [this.firstRadar, this.secondRadar];
  }

  parseRadarsAxisValuesForAxisChart(axis) {
    return [this.firstRadar.axisValuesFor(axis), this.secondRadar.axisValuesFor(axis)];
  }

  parseRadarTitlesToAxisChart() {
    return [this.firstRadar.name, this.secondRadar.name];
  }

  private redirectToSelectToCompareIfThereAreNotRadars() {
    if (this.radarsAreNullOrUndefined()) {
      this.router.navigateByUrl('/selectToCompare');
    }
  }

  private radarsAreNullOrUndefined() {
    return this.firstRadar === null || this.firstRadar === undefined || this.secondRadar === null || this.secondRadar === undefined;
  }
}
