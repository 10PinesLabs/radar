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
    const radarId = 1;
    radar = new Radar('Radar 2018', 'Radar utilizado en el Retiro Estrategico 10Pines 2018', axes, radarId);
  });

  it('un radar tiene aristas', () => {
    expect(radar.axes.length).toBe(3);
  });

  it('un radar no puede tener menos de 3 aristas', () => {
    expect(createWrongRadar).toThrowError(Error, 'Los radares no pueden tener menos de 3 aristas');
  });

  it('un radar tiene titulo', () => {
    expect(radar.name).toBe('Radar 2018');
  });

  it('un radar tiene titulo por default', () => {
    expect(new Radar('', 'Radar utilizado en el Retiro Estrategico 10Pines 2018', axes, 1).name).toBe('Sin nombre');
    expect(new Radar(null, 'Radar utilizado en el Retiro Estrategico 10Pines 2018', axes, 1).name).toBe('Sin nombre');
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
    expect(radar.isClosed()).toBeFalsy();
  });

  it('un radar puede cerrarse', () => {
    radar.close();

    expect(radar.isClosed()).toBeTruthy();
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

  it('cuando se crea un radar, la cantidad de votos de cada arista es cero', () => {
    const valuesForAxis = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    expectAxisValuesForEachAxis(valuesForAxis);
  });

  it('cuando se vota un radar, aumenta el valor en 1 de la posicion del axis', () => {
    const valuesForAxis = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 };
    voteAllValuesOfAxes();

    expectAxisValuesForEachAxis(valuesForAxis);
  });

  it('cuando se cierra un radar, puedo obtener todos los valores de las posiciones de los axis', () => {
    const valuesForAxis = { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3 };
    voteAllValuesOfAxesTimes(3);
    radar.close();

    expectAxisValuesForEachAxis(valuesForAxis);
  });

  it('cuando le pido a un radar los valores de un axis que no tiene lanza una excepcion', () => {
    expect(getNotRadarAxisValues).toThrowError(Error, 'El axis no pertenece al radar');
  });

  it('le puedo pedir al radar los valores de todas las aristas', () => {
    const valuesForAxis = { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3 };
    const expectedValuesForAxis = [[calidadTecnica, valuesForAxis], [calidadHumana, valuesForAxis], [ambienteLaboral, valuesForAxis]];
    voteAllValuesOfAxesTimes(3);

    expect(radar.axisValues()).toEqual(expectedValuesForAxis);
  });

  function expectAxisValuesForEachAxis(valuesForAxis) {
    expect(radar.axisValuesFor(calidadTecnica)).toEqual(valuesForAxis);
    expect(radar.axisValuesFor(calidadHumana)).toEqual(valuesForAxis);
    expect(radar.axisValuesFor(ambienteLaboral)).toEqual(valuesForAxis);
  }

  function voteAllValuesOfAxesTimes(times: number) {
    const arrayTimes = Array.apply(null, {length: times}).map(Function.call, Number);

    arrayTimes.forEach( time => voteAllValuesOfAxes());
  }

  function voteAllValuesOfAxes() {
    [1, 2, 3, 4, 5].forEach( val => {
      const vote = getVoteWithVal(val);
      radar.registerVote(vote);
    });
  }

  function getVoteWithVal(val) {
    // Estas lineas simulan el hecho de apretar los radio buttons del componente RadarVote
    ambienteLaboral.vote = val;
    calidadHumana.vote = val;
    calidadTecnica.vote = val;

    return new Vote([
      {axis: ambienteLaboral, vote: val},
      {axis: calidadHumana, vote: val},
      {axis: calidadTecnica, vote: val}
    ]);
  }

  function voteAllAxes() {
    return getVoteWithVal(5);
  }

  function createWrongRadar() {
    axes = [new Axis('Calidad técnica', 'La calidad técnica representa el eje...')];
    const description = 'Radar utilizado en el Retiro Estrategico 10Pines 2018';
    const radarId = 3;
    return new Radar(null, description, axes, radarId);
  }

  function tryToCloseAgain() {
    return radar.close();
  }

  function getNotRadarAxisValues() {
    const aNonRadarAxis = new Axis('A non radar axis', 'A non radar description...');

    radar.axisValuesFor(aNonRadarAxis);
  }
});
