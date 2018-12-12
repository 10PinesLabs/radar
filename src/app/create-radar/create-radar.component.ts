import { Component, OnInit, Inject } from '@angular/core';
import { Axis } from 'src/model/axis';
import { Radar } from 'src/model/radar';
import { RadarService } from 'src/services/radar.service';

@Component({
  selector: 'app-create-radar',
  templateUrl: './create-radar.component.html',
  styleUrls: ['./create-radar.component.scss']
})
export class CreateRadarComponent implements OnInit {

  axes: Axis[] = [];
  radarTitle = '';
  radarDescription = '';

  constructor(@Inject('RadarService') private radarService: RadarService) { }

  ngOnInit() { }

  radarIsInvalid(): boolean {
    return this.radarTitleIsEmpty() || this.radarAxesIsLessThanThree();
  }

  createRadar() {
    const newRadar = new Radar(this.radarTitle, this.radarDescription, this.axes, null);
    this.radarService.createRadar(newRadar);
    window.location.href = '/';
  }

  private radarTitleIsEmpty(): boolean {
    return this.radarTitle.length === 0;
  }

  private radarAxesIsLessThanThree(): boolean {
    return this.axes.length < 3;
  }
}
