import { Component, OnInit, Input } from '@angular/core';
import { Axis } from 'src/model/axis';

@Component({
  selector: 'app-axes-form',
  templateUrl: './axes-form.component.html',
  styleUrls: ['./axes-form.component.scss']
})
export class AxesFormComponent implements OnInit {

  @Input() axes: Axis[];
  newAxis: Axis;

  constructor() {
    this.newAxis = new Axis('', '');
  }

  ngOnInit() { }

  eraseAxis(axisToErase) {
    const idxToErase = this.axes.indexOf(axisToErase);
    const qttyToBeErased = 1;
    this.axes.splice(idxToErase, qttyToBeErased);
  }

  addAxisToAxes() {
    this.axes.push(this.newAxis);
    this.newAxis = new Axis('', '');
  }

  axisIsInvalid(): boolean {
    return this.newAxis.title.length === 0;
  }

  cardBodyClases() {
    const classes = this.isAxesQuantityValid() ?
      'card-body axis-card-body valid-axes-quantity' : 'card-body axis-card-body invalid-axes-quantity';
    return classes;
  }

  private isAxesQuantityValid() {
    return this.axes.length >= 3;
  }
}
