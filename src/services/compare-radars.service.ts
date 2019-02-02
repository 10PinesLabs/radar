import { Injectable } from '@angular/core';
import { Radar } from 'src/model/radar';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompareRadarsService {
  private firstRadarSource = new BehaviorSubject<Radar>(undefined);
  private secondRadarSource = new BehaviorSubject<Radar>(undefined);

  constructor() { }

  changeRadars(firstRadar: Radar, secondRadar: Radar) {
    this.firstRadarSource.next(firstRadar);
    this.secondRadarSource.next(secondRadar);
  }

  firstRadar(): Observable<Radar> {
    return this.firstRadarSource.asObservable();
  }

  secondRadar(): Observable<Radar> {
    return this.secondRadarSource.asObservable();
  }
}
