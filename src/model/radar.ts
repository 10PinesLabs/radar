import {Axis} from './axis';
import {Vote} from './vote';

export class Radar {
  closed: boolean;
  votes: Array<Vote>;
  axes: Array<Axis>;
  title: string;
  description: string;
  id: number;

  constructor(title: string, description: string, axes: Array<Axis>, id: number) {
    this.validateAxesLength(axes);
    this.setTitle(title);
    this.setDescription(description);
    this.setRadarToAxes();

    this.closed = false;
    this.votes = [];
    this.id = id;
  }

  registerVote(vote: Vote): any {
    this.votes.push(vote);
  }

  close() {
    this.validateClosedState();
    this.closed = true;
  }

  cannotVote() {
    return this.axes.some(axis => axis.hasInvalidVote());
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

  private setTitle(title: string) {
    this.title = title || 'Sin título';
  }

  private setRadarToAxes() {
    this.axes.forEach(axis => axis.radar = this);
  }
}
