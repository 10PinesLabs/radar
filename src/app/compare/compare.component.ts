import { Component, OnInit, Inject } from '@angular/core';
import { RadarService } from 'src/services/radar.service';
import { Radar } from 'src/model/radar';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {

  radars: Radar[];
  firstRadar: Radar;
  secondRadar: Radar;

  constructor(@Inject('RadarService') private radarService: RadarService) { }

  ngOnInit() {
    this.radarService.radars().subscribe(radars => {
      this.radars = radars;
      this.radars = this.radars.sort((r1, r2) => r2.id - r1.id); // mayor id a menor id
      this.firstRadar = this.radars[0];
      this.secondRadar = this.radars[0];
    });
  }

}
