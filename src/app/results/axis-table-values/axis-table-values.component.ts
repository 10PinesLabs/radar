import { Component, OnInit, Input } from '@angular/core';
import { Axis } from 'src/model/axis';
import { Statistics } from 'src/model/statistics';

@Component({
  selector: 'app-axis-table-values',
  templateUrl: './axis-table-values.component.html',
  styleUrls: ['./axis-table-values.component.css']
})
export class AxisTableValuesComponent implements OnInit {

  @Input() axis: Axis;
  @Input() values;
  mean: number;
  median: number;
  expectedValue: number;

  constructor() { }

  ngOnInit() {
    const statistics = new Statistics(this.values);
    this.mean = statistics.mean();
    this.median = statistics.median();
    this.expectedValue = statistics.expectedValue();
  }

}
