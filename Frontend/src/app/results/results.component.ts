import { Component, Inject, OnInit } from '@angular/core';
import { RadarService } from '../../services/radar.service';
import { Radar } from '../../model/radar';
import { ActivatedRoute } from '@angular/router';
import { Axis } from '../../model/axis';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  radar: Radar;

  constructor(@Inject('RadarService') private radarService: RadarService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.radarService.radar(id).subscribe(radarResult => {
      const radar = radarResult.radar;
      const axes = this.parseAxes(radarResult.axes_results);
      this.radar = new Radar(radar.id, radar.name, radar.description, axes, radar.active);
    });
  }

  parseAxes(axes_results): any {
    return axes_results.map(e => new Axis(e.axis.id, e.axis.name, e.axis.description, e.axis.answers));
  }

  parseRadarToRadarChart() {
    return [this.radar];
  }

  axes() {
    return this.radar.axes;
  }

  parseRadarAxisValuesForCharts(axis) {
    return [this.radar.axisPointsFor(axis)];
  }

  parseRadarNameToAxisChart() {
    return [this.radar.name];
  }

  title() {
    const radarState = this.radar.isClosed() ? '(Cerrado)' : '(Abierto)';
    return this.radar.name + ' ' + radarState;
  }

  axesNames() {
    return this.radar.axes.map(axis => axis.name);
  }

  radarIsUndefined() {
    return this.radar === undefined;
  }
}
