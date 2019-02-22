import { Axis } from '../../model/axis';
import {Radar} from '../../model/radar';

describe('Axis', () => {
  let arista: Axis;
  let calidadTecnica: Axis;
  let calidadHumana: Axis;
  let ambienteLaboral: Axis;
  let axes: Array<Axis>;
  let radar: Radar;

  beforeEach(() => {
    calidadTecnica = new Axis('Calidad técnica', 'La calidad técnica representa el eje...');
    calidadHumana = new Axis('Calidad humana', 'La calidad humana representa el eje...');
    ambienteLaboral = new Axis('Ambiente laboral', 'El ambiente laboral representa el eje...');

    axes = [calidadTecnica, calidadHumana, ambienteLaboral];

    radar = new Radar('Radar 2018', 'Radar utilizado en el Retiro Estrategico 10Pines 2018', axes, 1);

    arista = calidadHumana;
  });

  it('pertenece a un radar', () => {
    expect(arista.radar).toBe(radar);
  });

  it('una arista tiene un titulo', () => {
    expect(arista.name).toBe('Calidad humana');
  });

  it('una arista tiene una descripción', () => {
    expect(arista.description).toBe('La calidad humana representa el eje...');
  });

  it('una arista puede ser puntuada', () => {
    arista.registerVote(5);

    expect(arista.vote).toBe(5);
  });

  it('cuando se crea la arista su voto es invalido', function () {
    expect(arista.hasInvalidVote()).toBeTruthy();
  });

  it('cuando se vota a la arista su voto deja de ser invalido', function () {
    arista.registerVote(5);

    expect(arista.hasInvalidVote()).toBeFalsy();
  });
});
