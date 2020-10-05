import { Axis } from './axis';

export class Answer {
    axis: Axis;
    points: number;

    constructor(axis: Axis, points: number) {
        this.axis = axis;
        this.points = points;
    }

    registerPoints(points: number) {
        this.points = points;
    }
}
