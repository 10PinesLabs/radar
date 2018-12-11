import { Component, OnInit } from '@angular/core';
import { Axis } from 'src/model/axis';

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

  constructor() { }

  ngOnInit() { }

  addAxisToAxes() {
    const newAxis = new Axis(this.axisName, this.axisDescription);
    this.axes.push(newAxis);
    this.axisName = '';
    this.axisDescription = '';
  }

  radarIsInvalid(): boolean {
    return this.radarNameIsEmpty() || this.radarAxesIsEmpty();
  }

  eraseAxis(axisToErase) {
    const idxToErase = this.axes.indexOf(axisToErase);
    const qttyToBeErased = 1;
    this.axes.splice(idxToErase, qttyToBeErased);
  }

  axisIsInvalid(): boolean {
    return this.axisName.length === 0;
  }

  private radarNameIsEmpty(): boolean {
    return this.radarName.length === 0;
  }

  private radarAxesIsEmpty(): boolean {
    return this.axes.length === 0;
  }
}
