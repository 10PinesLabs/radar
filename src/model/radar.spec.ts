import {Radar} from './radar';
import {Axis} from './axis';
import {Vote} from './vote';

describe('Radar', () => {
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
    radar = new Radar('Radar 2018', axes, 1);
  });

  it('un radar tiene aristas', () => {
    expect(radar.axes.length).toBe(3);
  });

  it('un radar no puede tener menos de 3 aristas', () => {
    expect(createWrongRadar).toThrowError(Error, 'Los radares no pueden tener menos de 3 aristas');
  });

  it('un radar tiene descripción', () => {
    expect(radar.description).toBe('Radar 2018');
  });

  it('un radar tiene descripción por default', () => {
    expect(new Radar('', axes, 1).description).toBe('Sin descripción');
    expect(new Radar(null, axes, 1).description).toBe('Sin descripción');
  });

  it('un radar tiene votos registrados', () => {
    const votes = [
      {axis: ambienteLaboral, vote: 5},
      {axis: ambienteLaboral, vote: 5},
      {axis: ambienteLaboral, vote: 5}
      ];
    const vote = new Vote(radar, votes);

    radar.registerVote(vote);

    expect(radar.votes.length).toBe(1);
    expect(radar.votes[0]).toBe(vote);
  });

  it('un radar no esta cerrado cuando se crea', () => {
    expect(radar.closed).toBeFalsy();
  });

  it('un radar puede cerrarse', () => {
    radar.close();

    expect(radar.closed).toBeTruthy();
  });

  it('un radar no puede cerrarse más de una vez', () => {
    radar.close();

    expect(tryToCloseAgain).toThrowError(Error, 'El radar que intentas cerrar ya ha sido cerrado');
  });

  function createWrongRadar() {
    return new Radar(null, [new Axis('Calidad técnica', 'La calidad técnica representa el eje...')], 3);
  }

  function tryToCloseAgain() {
    return radar.close();
  }
});
