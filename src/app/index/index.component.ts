import { Component, OnInit, Inject } from '@angular/core';
import { RadarService } from 'src/services/radar.service';
import { Radar } from 'src/model/radar';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  radars: Radar[];

  constructor(@Inject('RadarService') private radarService: RadarService) { }

  ngOnInit() {
    this.radarService.radars().subscribe(radars => this.radars = radars);
    this.radars = this.radars.sort((r1, r2) => r2.id - r1.id); // mayor id a menor id
  }
}
