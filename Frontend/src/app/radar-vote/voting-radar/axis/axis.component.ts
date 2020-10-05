import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/model/answer';

@Component({
  selector: 'app-axis',
  templateUrl: './axis.component.html',
  styleUrls: ['./axis.component.scss']
})
export class AxisComponent implements OnInit {
  @Input() answer: Answer;

  constructor() { }

  ngOnInit() { }

  vote(points: number): void {
    this.answer.registerPoints(points);
  }
}
