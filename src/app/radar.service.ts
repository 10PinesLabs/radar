import { Injectable } from '@angular/core';
import {Radar} from '../model/radar';
import {RADARS} from './mock-radars';

@Injectable({
  providedIn: 'root'
})
export class RadarService {
  radares: Radar[];

  constructor() {
    this.radares = RADARS;
  }

  radar(radarId: any): Radar {
    return this.radares.find(radar => ( radar.id === radarId));
  }

  radars(): Array<Radar> {
    return this.radares;
  }
}
