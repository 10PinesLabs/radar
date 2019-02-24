import { Component, OnInit, Input, Output, Inject, EventEmitter } from '@angular/core';
import { RadarService } from '../../../services/radar.service';
import { Radar } from 'src/model/radar';
import { Axis } from 'src/model/axis';
import { Vote } from 'src/model/vote';
import { Answer } from 'src/model/answer';


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
  answers: Array<Answer>;

  constructor(@Inject('RadarService') private radarService: RadarService) { }

  ngOnInit() {
    this.answers = this.axes.map(axis => new Answer(axis, 0));
  }

  cannotVote() {
    let cannotVote = false;
    this.answers.forEach(answer => {
      if (answer.points === 0) {
        cannotVote = true;
      }
    });
    return cannotVote;
  }

  vote() {
    const vote = new Vote(this.answers);
    this.radarService.vote(this.radar.id, vote).subscribe(() => {
      this.voted = true;
      this.votedChange.emit(this.voted);
    });
  }
}
