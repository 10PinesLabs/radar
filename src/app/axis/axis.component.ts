import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-axis',
  templateUrl: './axis.component.html',
  styleUrls: ['./axis.component.scss']
})
export class AxisComponent implements OnInit {
  @Input() axis; Axis;

  constructor() { }

  ngOnInit() {
  }

  vote(calification: number): void {
    this.axis.registerVote(calification);
  }
}
