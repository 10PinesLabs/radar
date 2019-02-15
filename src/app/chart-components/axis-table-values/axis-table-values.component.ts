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
  @Input() radarTitles;
  axesStatistics = [];
  mean: number;
  median: number;
  expectedValue: number;

  constructor() { }

  ngOnInit() {
    this.getValueStatistics(this.values[0], this.radarTitles[0]);
    if (this.values.length === 2) {
      this.getValueStatistics(this.values[1], this.radarTitles[1]);
    }
  }

  getValueStatistics(values, radarTitle) {
    const statistics = new Statistics(values);
    this.axesStatistics.push({
      title: radarTitle,
      mean: statistics.mean(),
      median: statistics.median(),
      expectedValue: statistics.expectedValue(),
    });

  }
}
