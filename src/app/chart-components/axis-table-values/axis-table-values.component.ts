import { Component, OnInit, Input } from '@angular/core';
import { Axis } from 'src/model/axis';
import { Statistics } from 'src/model/statistics';

@Component({
  selector: 'app-axis-table-values',
  templateUrl: './axis-table-values.component.html',
  styleUrls: ['./axis-table-values.component.scss']
})
export class AxisTableValuesComponent implements OnInit {

  @Input() axis: Axis;
  @Input() values;
  @Input() radarNames;
  axesStatistics = [];
  mean: number;
  expectedValue: number;

  constructor() { }

  ngOnInit() {
    this.getValueStatistics(this.values[0], this.radarNames[0]);
    if (this.values.length === 2) {
      this.getValueStatistics(this.values[1], this.radarNames[1]);
    }
  }

  getValueStatistics(values, radarName) {
    const statistics = new Statistics(values);
    this.axesStatistics.push({
      name: radarName,
      mean: statistics.mean(),
      expectedValue: statistics.expectedValue(),
    });

  }
}
