import {Axis} from './axis';
import {Vote} from './vote';

export class Radar {
  active: boolean;
  votes: Array<Vote>;
  axes: Array<Axis>;
  name: string;
  description: string;
  id: number;

  constructor(name: string, description: string, axes: Array<Axis>, id: number, active = true) {
    this.validateAxesLength(axes);
    this.setName(name);
    this.setDescription(description);
    this.setRadarToAxes();

    this.active = active;
    this.votes = [];
    this.id = id;
  }

  registerVote(vote: Vote): any {
    this.votes.push(vote);
  }

  close() {
    this.validateActiveState();
    this.active = false;
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
    return !this.active;
  }

  axisBelongsToRadar(axis: Axis) {
    let belongs = false;
    this.axes.forEach(radarAxis => {
      if (axis.title === radarAxis.title) {
        belongs =  true;
      }
    });

    return belongs;
  }

  private validateAxisBelongsToRadar(axis) {
    if (this.axisBelongsToAxes(axis)) {
      throw new Error('El axis no pertenece al radar');
    }
  }

  private axisBelongsToAxes(axis) {
    return this.axes.indexOf(axis) === -1;
  }

  private validateActiveState() {
    if (!this.active) {
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

  private setName(name: string) {
    this.name = name || 'Sin nombre';
  }

  private setRadarToAxes() {
    this.axes.forEach(axis => axis.radar = this);
  }
}
