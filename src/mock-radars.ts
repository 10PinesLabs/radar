import {Radar} from './model/radar';
import {Axis} from './model/axis';

export const AXES: Axis[] = [
  new Axis('Calidad técnica', 'La calidad técnica representa el eje...'),
  new Axis('Calidad humana', 'La calidad humana representa el eje...'),
  new Axis('Ambiente laboral', 'El ambiente laboral representa el eje...')
];

export const RADARS: Radar[] = [
  new Radar('Radar 2016', 'Radar utilizado en el Retiro Estrategico 10Pines 2018', AXES, 1),
  new Radar('Radar 2017', 'Radar utilizado en el Retiro Estrategico 10Pines 2018', AXES, 2),
  new Radar('Radar 2018', 'Radar utilizado en el Retiro Estrategico 10Pines 2018', AXES, 3)
];
