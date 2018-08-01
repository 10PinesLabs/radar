import {Axis} from './axis';
import {Vote} from './vote';

export class Radar {
  closed: boolean;
  votes: Array<Vote>;
  axes: Array<Axis>;
  description: string;
  id: number;

  constructor(description: string, axes: Array<Axis>, id: number) {
    this.validateAxesLength(axes);
    this.setDescription(description);

    this.closed = false;
    this.votes = [];
    this.id = id;
  }

  axesLength() {
    return this.axes.length;
  }

  registerVote(vote: Vote): any {
    this.votes.push(vote);
  }

  close() {
    this.validateClosedState();
    this.closed = true;
  }

  private validateClosedState() {
    if (this.closed) {
      throw new Error('El radar que intentas cerrar ya ha sido cerrado');
    }
  }

  private validateAxesLength(axes: Array<Axis>): any {
    if (axes.length < 3) {
      throw new Error('Los radares no pueden tener menos de 3 aristas');
    }
    this.axes = axes;
  }

  private setDescription(description: string) {
    this.description = description || 'Sin descripción';
  }
}
