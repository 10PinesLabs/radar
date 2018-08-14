import {Injectable} from '@angular/core';
import {Radar} from '../model/radar';
import {Vote} from '../model/vote';
import {Observable} from 'rxjs/index';
import {RadarService} from './radar.service';

@Injectable({
  providedIn: 'root'
})
export class HttpRadarService implements RadarService {
  radar(radarId: any): Observable<Radar> {
    throw Error('WIP: Not implemented');
  }

  radars(): Observable<Array<Radar>> {
    throw Error('WIP: Not implemented');
  }

  vote(radar: Radar, vote: Vote): Observable<Vote> {
    throw Error('WIP: Not implemented');
  }
}
