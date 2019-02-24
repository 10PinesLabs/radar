import { Injectable } from '@angular/core';
import { Radar } from '../model/radar';
import { Vote } from '../model/vote';
import { Observable } from 'rxjs/index';
import { RadarService } from './radar.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpRadarService implements RadarService {

  constructor (private http: HttpClient) { }

  radar(radarId: number): any {
    const radarToVoteURL = 'http://localhost:3000/api/radars/' + radarId + '/result';
    return this.http.get<Radar>(radarToVoteURL);
  }

  getAll(): Observable<Radar[]> {
    return this.http.get<Array<Radar>>('http://localhost:3000/api/radars');
  }

  vote(radarId: number, vote: Vote): any {
    const voteURL = 'http://localhost:3000/api/radars/' + radarId + '/votes';
    return this.http.post(voteURL, vote);
  }

  close(radarId: number): any {
    const closeURL = 'http://localhost:3000/api/radars/' + radarId + '/close';
    return this.http.post(closeURL, {});
  }

  createRadar(radar: Radar): any {
    return this.http.post('http://localhost:3000/api/radars', radar);
  }
}
