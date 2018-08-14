import {Component, Inject, OnInit} from '@angular/core';
import {RadarService} from '../../services/radar.service';
import {Radar} from '../../model/radar';
import {ActivatedRoute, Router} from '@angular/router';
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

  constructor(@Inject('RadarService') private radarService: RadarService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.radarService.radar(id).subscribe(radar => {
      this.radar = radar;
      this.axes = this.radar.axes;
    });
  }

  vote() {
    const vote = this.createVote();
    this.radarService.vote(this.radar, vote).subscribe(_ =>
      this.router.navigate(['/'])
    );
  }

  service(): RadarService {
    return this.radarService;
  }

  private createVote() {
    const axesCalifications = this.radar.axes.map(axis => ({axis: axis, vote: axis.vote}));
    return new Vote(axesCalifications);
  }
}
