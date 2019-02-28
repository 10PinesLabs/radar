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

  constructor(@Inject('RadarService') private radarService: RadarService) {
    this.radars = [];
  }

  ngOnInit() {
    this.radarService.getAll().subscribe(radars => {

      radars.forEach(radar => {
        this.radars.push(new Radar(radar.id, radar.name, radar.description, radar.axes, radar.active));
      });
      this.radars = this.radars.sort((r1, r2) => r2.id - r1.id); // mayor id a menor id
    });
  }
}
