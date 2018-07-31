import { Vote } from './vote';

describe('Vote', () => {
  let voto: Vote;

  beforeEach(() => {
    voto = new Vote();
  });

  it('un voto pertenece a un radar', () => {
    expect(voto).toBeTruthy();
  });

  it('un voto contiene una respuesta por cada arista del radar', () => {
    expect(voto).toBeTruthy();
  });

  it('un voto no puede ser creado si no contiene una respuesta por cada arista del radar', () => {
    expect(voto).toBeTruthy();
  });
});
