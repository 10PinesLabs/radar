import {Radar} from './radar';

export class Axis {
  radar: Radar;
  title: string;
  description: string;
  vote: number;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }

  registerVote(vote: number): void {
    this.vote = vote;
  }
}
