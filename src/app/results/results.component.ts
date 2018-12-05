import { Component, Inject, OnInit } from '@angular/core';
import { RadarService } from '../../services/radar.service';
import { Radar } from '../../model/radar';
import { ActivatedRoute } from '@angular/router';
import { Axis } from '../../model/axis';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  radar: Radar;
  axes: Axis[];

  constructor(@Inject('RadarService') private radarService: RadarService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.radarService.radar(id).subscribe(radar => {
      this.radar = radar;
      this.axes = this.radar.axes;
    });
  }

}
