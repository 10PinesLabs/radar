import { Vote } from './vote';
import {Axis} from './axis';
import {Radar} from './radar';

describe('Vote', () => {
  let calidadTecnica: Axis;
  let calidadHumana: Axis;
  let ambienteLaboral: Axis;
  let axes: Array<Axis>;
  let radar: Radar;
  let voto: Vote;
  let votos: Array<{ axis: Axis; vote: number; }>;

  beforeEach(() => {
    calidadTecnica = new Axis('Calidad técnica', 'La calidad técnica representa el eje...');
    calidadHumana = new Axis('Calidad humana', 'La calidad humana representa el eje...');
    ambienteLaboral = new Axis('Ambiente laboral', 'El ambiente laboral representa el eje...');
    axes = [calidadTecnica, calidadHumana, ambienteLaboral];
    radar = new Radar('Radar 2018', 'Radar utilizado en el Retiro Estrategico 10Pines 2018', axes, 1);

    votos = [
      {axis: calidadTecnica, vote: 5},
      {axis: calidadHumana, vote: 4},
      {axis: ambienteLaboral, vote: 3}
    ];
    voto = new Vote(votos);
  });

  it('un voto contiene una respuesta por cada arista del radar', () => {
    expect(voto.votes[0].vote).toBe(5);
    expect(voto.votes[0].axis).toBe(calidadTecnica);

    expect(voto.votes[1].vote).toBe(4);
    expect(voto.votes[1].axis).toBe(calidadHumana);

    expect(voto.votes[2].vote).toBe(3);
    expect(voto.votes[2].axis).toBe(ambienteLaboral);
  });
});
