import { Component, OnInit } from '@angular/core';
import {RadarServiceStub} from '../radar.service';
import {Radar} from '../../model/radar';
import {ActivatedRoute} from '@angular/router';
import {Vote} from '../../model/vote';
import {Axis} from '../../model/axis';

@Component({
  selector: 'app-radar-vote',
  templateUrl: './radar-vote.component.html',
  styleUrls: ['./radar-vote.component.scss']
})
export class RadarVoteComponent implements OnInit {
  radar: Radar;
  axes: Axis[];

  constructor(private radarService: RadarServiceStub, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.radar = this.radarService.radar(id);
    this.axes = this.radar.axes;
  }

  vote() {
    this.radar.registerVote(this.createVote());
  }

  private createVote() {
    const votes = this.radar.axes.map(axis => ({axis: axis, vote: axis.vote}));
    return new Vote(this.radar, votes);
  }
}
