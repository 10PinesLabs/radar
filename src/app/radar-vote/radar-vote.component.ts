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

    this.radarService.radar(id).subscribe(radar => {
      this.radar = radar;
      this.axes = this.radar.axes;
    });
  }

  isVoted() {
    return this.voted;
  }

  title() {
    return this.radar.name;
  }
}
