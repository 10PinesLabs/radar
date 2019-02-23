import {Radar} from '../model/radar';
import {Vote} from '../model/vote';
import {Observable} from 'rxjs/index';

export interface RadarService {

  radar(radarId: number): any;

  getAll(): Observable<Array<Radar>>;

  vote(radar: Radar, vote: Vote): Observable<Vote>;

  close(radarId: number): any;

  createRadar(radar: Radar): any;
}
