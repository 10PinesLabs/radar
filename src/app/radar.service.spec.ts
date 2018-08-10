import { TestBed, inject } from '@angular/core/testing';
import { RadarServiceStub } from './radar.service';
import {Radar} from '../model/radar';
import {Axis} from '../model/axis';
import {Vote} from '../model/vote';

describe('RadarServiceStub', () => {
  let calidadTecnica: Axis;
  let calidadHumana: Axis;
  let ambienteLaboral: Axis;
  let axes: Array<Axis>;
  let radar2016: Radar;
  let radar2017: Radar;
  let radar2018: Radar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RadarServiceStub]
    });

    calidadTecnica = new Axis('Calidad técnica', 'La calidad técnica representa el eje...');
    calidadHumana = new Axis('Calidad humana', 'La calidad humana representa el eje...');
    ambienteLaboral = new Axis('Ambiente laboral', 'El ambiente laboral representa el eje...');
    axes = [calidadTecnica, calidadHumana, ambienteLaboral];

    radar2016 = new Radar('Radar 2016', 'Radar utilizado en el Retiro Estrategico 10Pines 2018', axes, 1);
    radar2017 = new Radar('Radar 2017', 'Radar utilizado en el Retiro Estrategico 10Pines 2018', axes, 2);
    radar2018 = new Radar('Radar 2018', 'Radar utilizado en el Retiro Estrategico 10Pines 2018', axes, 3);

  });

  it('devuelve los radares existentes', inject([RadarServiceStub], (service: RadarServiceStub) => {
    const radars = service.radars();

    expect(radars.length).toBe(3);
    expect(radars[0].id).toBe(radar2016.id);
    expect(radars[1].id).toBe(radar2017.id);
    expect(radars[2].id).toBe(radar2018.id);
  }));

  it('devuelve un radar en particular', inject([RadarServiceStub], (service: RadarServiceStub) => {
    expect(service.radar(1).id).toBe(radar2016.id);
  }));
});
