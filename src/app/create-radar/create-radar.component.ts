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
}
