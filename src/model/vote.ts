import {Axis} from './axis';

export class Vote {
  votes: Array<{ axis: Axis; vote: number; }>;

  constructor(votes: Array<{ axis: Axis; vote: number; }>) {
    this.votes = votes;
  }
}
