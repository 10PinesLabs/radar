import { Injectable } from '@angular/core';
import { Radar } from '../model/radar';
import { Vote } from '../model/vote';
import { Observable } from 'rxjs/index';
import { RadarService } from './radar.service';
import { InMemoryRadarService } from './in-memory-radar.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpRadarService implements RadarService {

  constructor (private http: HttpClient) { }

  radar(radarId: number): any {
    // throw Error('WIP: Not implemented');
    return new InMemoryRadarService().radar(radarId);
  }

  getAll(): Observable<Radar[]> {
    return this.http.get<Array<Radar>>('http://localhost:3000/api/radars');
  }

  vote(radar: Radar, vote: Vote): Observable<Vote> {
    // throw Error('WIP: Not implemented');
    return new InMemoryRadarService().vote(radar, vote);
  }

  close(radarId: number): any {
    const closeURL = 'http://localhost:3000/api/radars/' + radarId + '/close';
    return this.http.post(closeURL, {});
  }

  createRadar(radar: Radar): any {
    return this.http.post('http://localhost:3000/api/radars', radar);
  }
}
