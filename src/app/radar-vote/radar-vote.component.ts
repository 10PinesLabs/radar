import { Component, OnInit } from '@angular/core';
import {RadarService} from '../radar.service';
import {Radar} from '../../model/radar';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-radar-vote',
  templateUrl: './radar-vote.component.html',
  styleUrls: ['./radar-vote.component.scss']
})
export class RadarVoteComponent implements OnInit {

  radar: Radar;

  constructor(private radarService: RadarService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.radar = this.radarService.radar(id);
  }
}
