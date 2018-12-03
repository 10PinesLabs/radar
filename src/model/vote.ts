import {Axis} from './axis';

export class Vote {
  votes: Array<{ axis: Axis; vote: number; }>;

  constructor(votes: Array<{ axis: Axis; vote: number; }>) {
    this.votes = votes;
  }

  valueForAxis(axis) {
    let value;
    this.votes.forEach(vote => { if (axis === vote.axis) { value = vote.vote; } });
    return value;
  }
}
