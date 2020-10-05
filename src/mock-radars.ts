import { Radar } from './model/radar';
import { Axis } from './model/axis';
import { Answer } from './model/answer';


const calidadTecnicaAxis = new Axis(1, 'Calidad técnica', 'La calidad técnica representa el eje...', []);
const calidadHumanaAxis = new Axis(2, 'Calidad humana', 'La calidad humana representa el eje...', []);
const ambienteLaboralAxis = new Axis(3, 'Ambiente laboral', 'El ambiente laboral representa el eje...', []);
const buenosSueldosAxis = new Axis(4, 'Buenos Sueldos', 'Buenos sueldos representa al eje...', []);
const saberSmalltalkAxis = new Axis(5, 'Saber SmallTalk', 'Saber SmallTalk representa al eje...', []);
const saberHaskellAxis = new Axis(6, 'Saber Haskell', 'Saber Haskell representa al eje...', []);


const DIFFERENT_AXES: Axis[] = [
    buenosSueldosAxis,
    saberSmalltalkAxis,
    saberHaskellAxis,
];

const AXES: Axis[] = [
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


const radar2015 = new Radar(1, 'Radar 2015', descripcionCorta, DIFFERENT_AXES, true);
const radar2016 = new Radar(2, 'Radar 2016', descripcionLarga, AXES, true);
const radar2017 = new Radar(4, 'Radar 2017', descripcionMedia, AXES, true);
const radar2018 = new Radar(3, 'Radar 2018', descripcionCorta, AXES, true);

votar(radar2015, [[1, 2, 3, 4, 5], [2, 3, 4, 5, 1], [3, 4, 5, 1, 2]]);
votar(radar2016, [[3, 4, 5, 1, 2], [2, 3, 4, 5, 1], [1, 2, 3, 4, 5]]);
votar(radar2018, [[3, 3, 3, 1, 2], [4, 4, 4, 5, 1], [3, 2, 2, 4, 5]]);

export const RADARS: Radar[] = [
    radar2015,
    radar2016,
    radar2017,
    radar2018,
];

function votar(radar: Radar, pointsPerAxis) {
    radar.axes.forEach((axis, index) => {
        pointsPerAxis[index].forEach(point => axis.answers.push(new Answer(axis, point)));
    });
}

function crearDescripcionLarga(texto) {
    let textoLargo = '';

    for (let i = 0; i < 10; i++) {
        textoLargo = textoLargo + texto;
    }

    return textoLargo;
}
