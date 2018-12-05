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

  axisValuesFor(axis) {
    this.validateAxisBelongsToRadar(axis);

    const valuesForEachAxisPosition = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    this.votes.forEach( vote => valuesForEachAxisPosition[vote.valueForAxis(axis)] += 1 );
    return valuesForEachAxisPosition;
  }

  axisValues() {
    const axesWithVotes = [];
    this.axes.forEach(axis => {
      const valuesForAxis = this.axisValuesFor(axis);
      axesWithVotes.push([axis, valuesForAxis]);
    });

    return axesWithVotes;
  }

  isClosed() {
    return this.closed;
  }

  private validateAxisBelongsToRadar(axis) {
    if (this.axisBelongsToAxes(axis)) {
      throw new Error('El axis no pertenece al radar');
    }
  }

  private axisBelongsToAxes(axis) {
    return this.axes.indexOf(axis) === -1;
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
