import { Axis } from './axis';

describe('Axis', () => {
  let arista: Axis;

  beforeEach(() => {
    arista = new Axis();
  });

  it('una arista tiene un titulo', () => {
    expect(arista).toBeTruthy();
  });

  it('una arista tiene una descripción', () => {
    expect(arista).toBeTruthy();
  });

  it('una arista puede ser puntuada', () => {
    expect(arista).toBeTruthy();
  });
});
