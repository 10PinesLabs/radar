import {Axis} from './axis';

export class Radar {
  id: number;
  name: string;
  description: string;
  axes: Array<Axis>;
  active: boolean;

  constructor(id: number, name: string, description: string, axes, active: boolean) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.axes = axes;
    this.active = active;
  }

  isClosed() {
    return !this.active;
  }

  axisBelongsToRadar(axis: Axis) {
    let belongs = false;
    this.axes.forEach(radarAxis => {
      if (axis.name === radarAxis.name) {
        belongs =  true;
      }
    });

    return belongs;
  }

  axisPointsFor(axis: Axis) {
    let points = [];
    this.axes.forEach(radarAxis => {
      if (radarAxis.name === axis.name) {
        points = radarAxis.answers.map(answer => answer.points);
        return points;
      }
    });
    return points;
  }

  hasVotes() {
    return this.axes[0].answers.length !== 0;
  }
}
