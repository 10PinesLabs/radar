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

const descripcionCorta = 'Descripción corta del Radar.';

const descripcionMedia = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore \
                          et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip \
                          ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse \
                          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, \
                          sunt in culpa qui officia deserunt mollit anim id est laborum.';

const descripcionLarga = crearDescripcionLarga(descripcionMedia);


const radar2016 = new Radar('Radar 2016', descripcionLarga, AXES, 1);
const vote1 = new Vote([
  { axis: calidadTecnicaAxis, vote: 1 }, { axis: calidadHumanaAxis, vote: 1 }, { axis: ambienteLaboralAxis, vote: 1 }
]);
const vote2 = new Vote([
  { axis: calidadTecnicaAxis, vote: 2 }, { axis: calidadHumanaAxis, vote: 2 }, { axis: ambienteLaboralAxis, vote: 2 }
]);
const vote3 = new Vote([
  { axis: calidadTecnicaAxis, vote: 3 }, { axis: calidadHumanaAxis, vote: 3 }, { axis: ambienteLaboralAxis, vote: 3 }
]);
const vote4 = new Vote([
  { axis: calidadTecnicaAxis, vote: 4 }, { axis: calidadHumanaAxis, vote: 4 }, { axis: ambienteLaboralAxis, vote: 4 }
]);
const vote5 = new Vote([
  { axis: calidadTecnicaAxis, vote: 5 }, { axis: calidadHumanaAxis, vote: 5 }, { axis: ambienteLaboralAxis, vote: 5 }
]);

voteRadarTimes(radar2016, vote1, 3);
voteRadarTimes(radar2016, vote2, 4);
voteRadarTimes(radar2016, vote3, 5);
voteRadarTimes(radar2016, vote4, 4);
voteRadarTimes(radar2016, vote5, 3);

export const RADARS: Radar[] = [
  radar2016,
  new Radar('Radar 2017', descripcionMedia, AXES, 2),
  new Radar('Radar 2018', descripcionCorta, AXES, 3)
];

function voteRadarTimes(radar, vote, times) {
  for (let i = 0; i < times; i++) {
    radar.registerVote(vote);
  }
}

function crearDescripcionLarga(texto) {
  let textoLargo = '';

  for (let i = 0; i < 10; i++) {
    textoLargo = textoLargo + texto;
  }

  return textoLargo;
}
