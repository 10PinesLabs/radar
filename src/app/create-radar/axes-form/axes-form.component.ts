import { Component, OnInit, Input } from '@angular/core';
import { Axis } from 'src/model/axis';

@Component({
  selector: 'app-axes-form',
  templateUrl: './axes-form.component.html',
  styleUrls: ['./axes-form.component.scss']
})
export class AxesFormComponent implements OnInit {

  @Input() axes: Axis[];
  axisTitle = '';
  axisDescription = '';

  constructor() { }

  ngOnInit() { }

  addAxisToAxes() {
    const newAxis = new Axis(this.axisTitle, this.axisDescription);
    this.axes.push(newAxis);
    this.axisTitle = '';
    this.axisDescription = '';
  }

  axisIsInvalid(): boolean {
    return this.axisTitle.length === 0;
  }

}
