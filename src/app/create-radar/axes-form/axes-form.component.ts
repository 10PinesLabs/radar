import { Component, OnInit, Input } from '@angular/core';
import { Axis } from 'src/model/axis';

@Component({
  selector: 'app-axes-form',
  templateUrl: './axes-form.component.html',
  styleUrls: ['./axes-form.component.scss']
})
export class AxesFormComponent implements OnInit {

  @Input() axes: Axis[];
  @Input() showErrors: boolean;
  newAxis: Axis;
  axisNameError: boolean;

  constructor() {
    this.newAxis = new Axis(null, '', '', null);
    this.axisNameError = false;
  }

  ngOnInit() { }

  eraseAxis(axisToErase) {
    const idxToErase = this.axes.indexOf(axisToErase);
    const quantityToBeErased = 1;
    this.axes.splice(idxToErase, quantityToBeErased);
  }

  addAxisToAxes() {
    if (this.axisIsInvalid()) {
      this.axisNameError = true;
    } else {
      this.axisNameError = false;
      this.axes.push(this.newAxis);
      this.newAxis = new Axis(null, '', '', null);
    }
  }

  axisIsInvalid(): boolean {
    const trimmedName = this.newAxis.name.trim();
    return trimmedName.length === 0;
  }

  cardBodyClasses() {
    const classes = this.isAxesQuantityValid() ?
      'card-body axis-card-body valid-axes-quantity' : 'card-body axis-card-body invalid-axes-quantity';
    return classes;
  }

  axisNameInputClass() {
    const classes = 'form-control text-color' + (this.showAxisNameError() ? ' is-invalid' : '');
    return classes;
  }

  showAxisNameError() {
    return this.axisNameError && this.axisIsInvalid();
  }

  showAxesQuantityError() {
    return this.showErrors && this.axes.length < 3;
  }

  private isAxesQuantityValid() {
    return this.axes.length >= 3;
  }
}
