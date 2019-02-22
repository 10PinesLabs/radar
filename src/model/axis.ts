import { Radar } from './radar';

export class Axis {
  radar: Radar;
  name: string;
  description: string;
  vote: number;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  registerVote(vote: number): void {
    this.vote = vote;
  }

  hasInvalidVote() {
    return this.vote === undefined;
  }
}
