import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Radar } from 'src/model/radar';
import { RadarService } from 'src/services/radar.service';
import { Axis } from 'src/model/axis';


@Component({
  selector: 'app-compare-radars',
  templateUrl: './compare-radars.component.html',
  styleUrls: ['./compare-radars.component.scss']
})
export class CompareRadarsComponent implements OnInit {

  firstRadar: Radar;
  secondRadar: Radar;

  constructor(@Inject('RadarService') private radarService: RadarService,
                private router: Router,
                private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.radarService.radar(parseInt(params.get('firstRadarId'))).subscribe(firstRadar => {
        const radar = firstRadar.radar;
        this.firstRadar = new Radar(radar.id, radar.name, radar.description, radar.axes, radar.active);
      });

      this.radarService.radar(parseInt(params.get('secondRadarId'))).subscribe(secondRadar => {
        const radar = secondRadar.radar;
        this.secondRadar =
          new Radar(
            radar.id,
            radar.name,
            radar.description,
            radar.axes.map(a => new Axis(a.id, a.name, a.description, a.answers)), radar.active);
      });
    });
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
    return [this.firstRadar.axisPointsFor(axis), this.secondRadar.axisPointsFor(axis)];
  }

  parseRadarNamesToAxisChart() {
    return [this.firstRadar.name, this.secondRadar.name];
  }

  axesNames() {
    return this.axesInCommon().map(axis => axis.name);
  }

  canCompareRadars() {
    return this.axesInCommon().length !== 0;
  }

  radarsAreNullOrUndefined() {
    return this.firstRadar === null || this.firstRadar === undefined || this.secondRadar === null || this.secondRadar === undefined;
  }
}
