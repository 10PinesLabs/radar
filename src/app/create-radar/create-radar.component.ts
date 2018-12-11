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
  axisName = '';
  axisDescription = '';
  radarName = '';
  radarDescription = '';

  constructor(@Inject('RadarService') private radarService: RadarService) { }

  ngOnInit() { }

  addAxisToAxes() {
    const newAxis = new Axis(this.axisName, this.axisDescription);
    this.axes.push(newAxis);
    this.axisName = '';
    this.axisDescription = '';
  }

  radarIsInvalid(): boolean {
    return this.radarNameIsEmpty() || this.radarAxesIsLessThanThree();
  }

  eraseAxis(axisToErase) {
    const idxToErase = this.axes.indexOf(axisToErase);
    const qttyToBeErased = 1;
    this.axes.splice(idxToErase, qttyToBeErased);
  }

  axisIsInvalid(): boolean {
    return this.axisName.length === 0;
  }

  createRadar() {
    const newRadar = new Radar(this.radarName, this.radarDescription, this.axes, null);
    this.radarService.createRadar(newRadar);
    window.location.href = '/';
  }

  private radarNameIsEmpty(): boolean {
    return this.radarName.length === 0;
  }

  private radarAxesIsLessThanThree(): boolean {
    return this.axes.length < 3;
  }
}
