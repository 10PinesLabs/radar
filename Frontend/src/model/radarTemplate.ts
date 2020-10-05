import {Axis} from './axis';
import {Radar} from './radar';

export class RadarTemplate {
  id: number;
  name: string;
  description: string;
  axes: Array<Axis>;
  radars: Array<Radar>;
  active: boolean;

  constructor(id: number, name: string, description: string, axes, active: boolean, radars) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.axes = axes;
    this.radars = radars.map(radar => new Radar(radar.id, radar.name, radar.description, radar.axes, radar.active));
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
