import { Axis } from './axis';

export class AxisResult {
    axis: Axis;
    points = [];

    constructor(axis: Axis, points) {
        this.axis = axis;
        this.points = points;
    }
}
