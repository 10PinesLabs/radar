import {Component, Inject, OnInit} from '@angular/core';
import {RadarService} from '../../services/radar.service';
import {Radar} from '../../model/radar';
import {ActivatedRoute} from '@angular/router';
import {Axis} from '../../model/axis';

@Component({
  selector: 'app-radar-vote',
  templateUrl: './radar-vote.component.html',
  styleUrls: ['./radar-vote.component.scss']
})
export class RadarVoteComponent implements OnInit {
  radar: Radar;
  axes: Axis[];
  voted: boolean;

  constructor(@Inject('RadarService') private radarService: RadarService, private route: ActivatedRoute) {
    this.voted = false;
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.radarService.radar(id).subscribe(radarResult => {
      const radar = radarResult.radar;
      this.axes = this.parseAxes(radarResult.axes_results);
      this.radar = new Radar(radar.id, radar.name, radar.description, this.axes, radar.active);
    });
  }

  parseAxes(axes_results): any {
    return axes_results.map(e => new Axis(e.axis.id, e.axis.name, e.axis.description, null));
  }

  isVoted() {
    return this.voted;
  }

  title() {
    return this.radar.name;
  }

  radarIsUndefined() {
    return this.radar === undefined;
  }
}
