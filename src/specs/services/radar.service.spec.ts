import { TestBed, inject } from '@angular/core/testing';
import { InMemoryRadarService } from '../../services/in-memory-radar.service';
import {Radar} from '../../model/radar';
import {Axis} from '../../model/axis';
import {Vote} from '../../model/vote';

describe('InMemoryRadarService', () => {
  let calidadTecnica: Axis;
  let calidadHumana: Axis;
  let ambienteLaboral: Axis;
  let buenosSueldosAxis: Axis;
  let saberSmalltalkAxis: Axis;
  let saberHaskellAxis: Axis;
  let axes: Array<Axis>;
  let different_axes: Array<Axis>;
  let radar2016: Radar;
  let radar2017: Radar;
  let radar2018: Radar;
  let radar2015: Radar;

  let radares: Array<Radar>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InMemoryRadarService]
    });

    calidadTecnica = new Axis('Calidad técnica', 'La calidad técnica representa el eje...');
    calidadHumana = new Axis('Calidad humana', 'La calidad humana representa el eje...');
    ambienteLaboral = new Axis('Ambiente laboral', 'El ambiente laboral representa el eje...');
    buenosSueldosAxis = new Axis('Buenos Sueldos', 'Buenos sueldos representa al eje...');
    saberSmalltalkAxis = new Axis('Saber SmallTalk', 'Saber SmallTalk representa al eje...');
    saberHaskellAxis = new Axis('Saber Haskell', 'Saber Haskell representa al eje...');

    axes = [calidadTecnica, calidadHumana, ambienteLaboral];
    different_axes = [buenosSueldosAxis, saberSmalltalkAxis, saberHaskellAxis];

    radar2016 = new Radar('Radar 2016', 'Radar utilizado en el Retiro Estrategico 10Pines 2018', axes, 1);
    radar2017 = new Radar('Radar 2017', 'Radar utilizado en el Retiro Estrategico 10Pines 2018', axes, 2);
    radar2018 = new Radar('Radar 2018', 'Radar utilizado en el Retiro Estrategico 10Pines 2018', axes, 3);
    radar2015 = new Radar('Radar 2015', 'Radar utilizado en el Retiro Estrategico 10Pines 2018', different_axes, 4);

  });

  it('devuelve los radares existentes', inject([InMemoryRadarService], (service: InMemoryRadarService) => {
    service.radars().subscribe(radars => radares = radars);

    expect(radares.length).toBe(4);
    expect(radares[0].id).toBe(radar2015.id);
    expect(radares[1].id).toBe(radar2016.id);
    expect(radares[2].id).toBe(radar2017.id);
    expect(radares[3].id).toBe(radar2018.id);
  }));

  it('devuelve un radar en particular', inject([InMemoryRadarService], (service: InMemoryRadarService) => {
    let id = 0;
    service.radar(1).subscribe(radar => id = radar.id);

    expect(id).toBe(radar2016.id);
  }));

  it('registra un voto para un radar', inject([InMemoryRadarService], (service: InMemoryRadarService) => {
    axes.forEach(axis => axis.registerVote(5));
    const axesCalifications = axes.map(axis => ({axis: axis, vote: axis.vote}));

    service.vote(radar2018, new Vote(axesCalifications));

    expect(radar2018.votes.length).toBe(1);
  }));
});
