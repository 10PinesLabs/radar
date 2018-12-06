import { Radar } from './model/radar';
import { Axis } from './model/axis';
import { Vote } from './model/vote';


const calidadTecnicaAxis = new Axis('Calidad técnica', 'La calidad técnica representa el eje...');
const calidadHumanaAxis = new Axis('Calidad humana', 'La calidad humana representa el eje...');
const ambienteLaboralAxis = new Axis('Ambiente laboral', 'El ambiente laboral representa el eje...');
export const AXES: Axis[] = [
  calidadTecnicaAxis,
  calidadHumanaAxis,
  ambienteLaboralAxis
];


const radar2016 = new Radar('Radar 2016', 'Radar utilizado en el Retiro Estrategico 10Pines 2018', AXES, 1);
const vote1 = new Vote([
  { axis: calidadTecnicaAxis, vote: 3 }, { axis: calidadHumanaAxis, vote: 3 }, { axis: ambienteLaboralAxis, vote: 3 }
]);
const vote2 = new Vote([
  { axis: calidadTecnicaAxis, vote: 4 }, { axis: calidadHumanaAxis, vote: 4 }, { axis: ambienteLaboralAxis, vote: 4 }
]);
const vote3 = new Vote([
  { axis: calidadTecnicaAxis, vote: 5 }, { axis: calidadHumanaAxis, vote: 5 }, { axis: ambienteLaboralAxis, vote: 5 }
]);

radar2016.registerVote(vote1);
radar2016.registerVote(vote2);
radar2016.registerVote(vote3);

export const RADARS: Radar[] = [
  radar2016,
  new Radar('Radar 2017', 'Radar utilizado en el Retiro Estrategico 10Pines 2018', AXES, 2),
  new Radar('Radar 2018', 'Radar utilizado en el Retiro Estrategico 10Pines 2018', AXES, 3)
];
