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
  }
}
