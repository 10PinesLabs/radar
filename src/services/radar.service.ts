import {Radar} from '../model/radar';
import {Vote} from '../model/vote';
import {Observable} from 'rxjs/index';

export interface RadarService {

  radar(radarId: any): Observable<Radar>;

  getAll(): Observable<Array<Radar>>;

  vote(radar: Radar, vote: Vote): Observable<Vote>;

  close(radarId: any): void;

  createRadar(radar: Radar);
}
