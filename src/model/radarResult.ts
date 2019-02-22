import { Radar } from './radar';
import { AxisResult } from './axisResult';

export class RadarResult {
    radar: Radar;
    axesResult: Array<AxisResult>;

    constructor(radar: Radar, axesResult: Array<AxisResult>) {
        this.radar = radar;
        this.axesResult = axesResult;
    }
}
