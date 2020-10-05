import { Answer } from './answer';

export class Axis {
  id: number;
  name: string;
  description: string;
  answers: Array<Answer>;

  constructor(id: number, name: string, description: string, answers) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.answers = answers;
  }
}
