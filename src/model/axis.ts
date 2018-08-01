export class Axis {
  title: string;
  description: string;
  vote: number;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }

  registerVote(vote: any): any {
    this.vote = vote;
  }
}
