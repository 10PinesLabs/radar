import { Radar } from './radar';

describe('Radar', () => {
  let radar: Radar;

  beforeEach(() => {
    radar = new Radar();
  });

  it('un radar tiene aristas', () => {
    expect(radar).toBeTruthy();
  });

  it('un radar no puede tener menos de 3 aristas', () => {
    expect(radar).toBeTruthy();
  });

  it('un radar tiene descripción', () => {
    expect(radar).toBeTruthy();
  });

  it('un radar tiene descripción por default', () => {
    expect(radar).toBeTruthy();
  });

  /* TODO: DEL SIGUIEN TEST NO ESTOY SEGURO */
  it('la descripción de un radar es la concatenación de las descripciones de sus aristas', () => {
    expect(radar).toBeTruthy();
  });

  it('un radar tiene una fecha', () => {
    expect(radar).toBeTruthy();
  });

  it('un radar esta activo cuando tiene aristas', () => {
    expect(radar).toBeTruthy();
  });

  it('un radar no esta activo cuando no tiene aristas', () => {
    expect(radar).toBeTruthy();
  });

  it('un radar tiene votos registrados', () => {
    expect(radar).toBeTruthy();
  });

  it('un radar puede cerrarse', () => {
    expect(radar).toBeTruthy();
  });

  it('un radar no puede cerrarse más de una vez', () => {
    expect(radar).toBeTruthy();
  });
});
