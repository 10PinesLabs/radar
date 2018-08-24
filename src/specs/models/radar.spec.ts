import {Radar} from '../../model/radar';
import {Axis} from '../../model/axis';
import {Vote} from '../../model/vote';

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
    radar = new Radar('Radar 2018', 'Radar utilizado en el Retiro Estrategico 10Pines 2018', axes, 1);
  });

  it('un radar tiene aristas', () => {
    expect(radar.axes.length).toBe(3);
  });

  it('un radar no puede tener menos de 3 aristas', () => {
    expect(createWrongRadar).toThrowError(Error, 'Los radares no pueden tener menos de 3 aristas');
  });

  it('un radar tiene titulo', () => {
    expect(radar.title).toBe('Radar 2018');
  });

  it('un radar tiene titulo por default', () => {
    expect(new Radar('', 'Radar utilizado en el Retiro Estrategico 10Pines 2018', axes, 1).title).toBe('Sin título');
    expect(new Radar(null, 'Radar utilizado en el Retiro Estrategico 10Pines 2018', axes, 1).title).toBe('Sin título');
  });

  it('un radar tiene descripción', () => {
    expect(radar.description).toBe('Radar utilizado en el Retiro Estrategico 10Pines 2018');
  });

  it('un radar tiene descripción por default', () => {
    expect(new Radar('Radar 2018', '', axes, 1).description).toBe('Sin descripción');
    expect(new Radar('Radar 2018', null, axes, 1).description).toBe('Sin descripción');
  });

  it('un radar tiene votos registrados', () => {
    const vote = voteAllAxes();
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

  it('un radar en el que sus aristas no fueron todas votadas no se puede enviar el voto', () => {
    expect(radar.cannotVote()).toBeTruthy();
  });

  it('un radar en el que todas sus aristas fueron votadas se puede enviar el voto', () => {
    const vote = voteAllAxes();
    radar.registerVote(vote);

    expect(radar.cannotVote()).toBeFalsy();
  });

  function voteAllAxes() {
    // Estas lineas simulan el hecho de apretar los radio buttons del componente RadarVote
    ambienteLaboral.vote = 5;
    calidadHumana.vote = 5;
    calidadTecnica.vote = 5;

    return new Vote([
      {axis: ambienteLaboral, vote: 5},
      {axis: calidadHumana, vote: 5},
      {axis: calidadTecnica, vote: 5}
    ]);
  }

  function createWrongRadar() {
    return new Radar(null, 'Radar utilizado en el Retiro Estrategico 10Pines 2018', [new Axis('Calidad técnica', 'La calidad técnica representa el eje...')], 3);
  }

  function tryToCloseAgain() {
    return radar.close();
  }
});
