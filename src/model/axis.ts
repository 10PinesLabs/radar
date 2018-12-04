import {Radar} from './radar';
import {isNullOrUndefined} from 'util';

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

  hasInvalidVote() {
    return this.vote === undefined;
  }
}
