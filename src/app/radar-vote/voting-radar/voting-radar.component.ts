import { Component, OnInit, Input, Output, Inject, EventEmitter } from '@angular/core';
import { RadarService } from '../../../services/radar.service';
import { Radar } from 'src/model/radar';
import { Axis } from 'src/model/axis';
import { Vote } from 'src/model/vote';


@Component({
  selector: 'app-voting-radar',
  templateUrl: './voting-radar.component.html',
  styleUrls: ['./voting-radar.component.css']
})
export class VotingRadarComponent implements OnInit {

  @Input() radar: Radar;
  @Input() axes: Axis[];
  @Input() voted: boolean;
  @Output() votedChange = new EventEmitter();

  constructor(@Inject('RadarService') private radarService: RadarService) { }

  ngOnInit() { }

  cannotVote() {
    return this.radar.cannotVote();
  }

  vote() {
    const vote = this.createVote();
    this.radarService.vote(this.radar, vote).subscribe();
    this.voted = true;
    this.votedChange.emit(this.voted);
  }

  private createVote() {
    const axesCalifications = this.radar.axes.map(axis => ({axis: axis, vote: axis.vote}));
    return new Vote(axesCalifications);
  }

}
