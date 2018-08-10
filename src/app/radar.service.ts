import { Injectable } from '@angular/core';
import {Radar} from '../model/radar';
import {RADARS} from './mock-radars';
import {Vote} from '../model/vote';

@Injectable({
  providedIn: 'root'
})
export class RadarServiceStub {

  constructor() {
  }

  radar(radarId: any): Radar {
    return RADARS.find(radar => ( radar.id === radarId));
  }

  radars(): Array<Radar> {
    return RADARS;
  }
}
