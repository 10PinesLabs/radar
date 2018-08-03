import { Injectable } from '@angular/core';
import {Radar} from '../model/radar';
import {Axis} from '../model/axis';

@Injectable({
  providedIn: 'root'
})
export class RadarService {
  calidadTecnica: Axis;
  calidadHumana: Axis;
  ambienteLaboral: Axis;
  axes: Array<Axis>;
  radar2016: Radar;
  radar2017: Radar;
  radar2018: Radar;

  radares: Radar[];

  constructor() {
    this.calidadTecnica = new Axis('Calidad técnica', 'La calidad técnica representa el eje...');
    this.calidadHumana = new Axis('Calidad humana', 'La calidad humana representa el eje...');
    this.ambienteLaboral = new Axis('Ambiente laboral', 'El ambiente laboral representa el eje...');
    this.axes = [this.calidadTecnica, this.calidadHumana, this.ambienteLaboral];

    this.radar2016 = new Radar('Radar 2016', 'Radar utilizado en el Retiro Estrategico 10Pines 2018', this.axes, 1);
    this.radar2017 = new Radar('Radar 2017', 'Radar utilizado en el Retiro Estrategico 10Pines 2018', this.axes, 2);
    this.radar2018 = new Radar('Radar 2018', 'Radar utilizado en el Retiro Estrategico 10Pines 2018', this.axes, 3);

    this.radares = [this.radar2016, this.radar2017, this.radar2018];
  }

  radar(radarId: any): Radar {
    return this.radares.find(radar => ( radar.id === radarId));
  }

  radars(): Array<Radar> {
    return this.radares;
  }
}
