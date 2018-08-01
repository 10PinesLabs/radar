import { Axis } from './axis';

describe('Axis', () => {
  let arista: Axis;

  beforeEach(() => {
    arista = new Axis('Calidad humana', 'La calidad humana representa el eje...');
  });

  it('una arista tiene un titulo', () => {
    expect(arista.title).toBe('Calidad humana');
  });

  it('una arista tiene una descripción', () => {
    expect(arista.description).toBe('La calidad humana representa el eje...');
  });

  it('una arista puede ser puntuada', () => {
    arista.registerVote(5);

    expect(arista.vote).toBe(5);
  });
});
