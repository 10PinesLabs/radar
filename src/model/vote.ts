import { Answer } from './answer';

export class Vote {
  answers: Array<Answer>;

  constructor(answers: Array<Answer>) {
    this.answers = answers;
  }
}
