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
  axisTitleError: boolean;

  constructor() {
    this.newAxis = new Axis('', '');
    this.axisTitleError = false;
  }

  ngOnInit() { }

  eraseAxis(axisToErase) {
    const idxToErase = this.axes.indexOf(axisToErase);
    const quantityToBeErased = 1;
    this.axes.splice(idxToErase, quantityToBeErased);
  }

  addAxisToAxes() {
    if (this.axisIsInvalid()) {
      this.axisTitleError = true;
    } else {
      this.axes.push(this.newAxis);
      this.newAxis = new Axis('', '');
    }
  }

  axisIsInvalid(): boolean {
    const trimmedTitle = this.newAxis.title.trim();
    return trimmedTitle.length === 0;
  }

  cardBodyClasses() {
    const classes = this.isAxesQuantityValid() ?
      'card-body axis-card-body valid-axes-quantity' : 'card-body axis-card-body invalid-axes-quantity';
    return classes;
  }

  axisTitleInputClass() {
    const classes = 'form-control text-color' + (this.showAxisTitleError() ? ' is-invalid' : '');
    return classes;
  }

  showAxisTitleError() {
    return this.axisTitleError && this.axisIsInvalid();
  }

  showAxesQuantityError() {
    return this.showErrors && this.axes.length < 3;
  }

  private isAxesQuantityValid() {
    return this.axes.length >= 3;
  }
}
