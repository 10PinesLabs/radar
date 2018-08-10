import { Injectable } from '@angular/core';
import {Radar} from '../model/radar';
import {RADARS} from './mock-radars';
import {Vote} from '../model/vote';
import {Observable, of} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class RadarServiceStub {

  constructor() {
  }

  radar(radarId: any): Observable<Radar> {
    return of(RADARS.find(radar => ( radar.id === radarId)));
  }

  radars(): Observable<Array<Radar>> {
    return of(RADARS);
  }

  vote(radar: Radar, vote: Vote): Observable<Vote> {
    radar.registerVote(vote);
    return of(vote);
  }
}
