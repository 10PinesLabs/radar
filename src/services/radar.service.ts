import {Radar} from '../model/radar';
import {Vote} from '../model/vote';
import {Observable} from 'rxjs/index';

export interface RadarService {

  radar(radarId: number): any;

  getAll(): Observable<Array<Radar>>;

  vote(radarId: number, vote: Vote): any;

  close(radarId: number): any;

  createRadar(radar: Radar): any;
}
