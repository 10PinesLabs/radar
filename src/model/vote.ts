import {Axis} from './axis';
import {Radar} from './radar';

export class Vote {
  radar: Radar;
  votes: [{ axis: Axis; vote: number; }];

  constructor(radar: Radar, votes: [{ axis: Axis; vote: number; }]) {
    this.validateRadar(radar);
    this.validateVotes(votes);
  }

  votesLength() {
    return this.votes.length;
  }

  private validateVotes(votes: [{ axis: Axis; vote: number }]) {
    if (votes.length < this.radar.axesLength()) {
      throw new Error('Faltan aristas por votar');
    }
    this.votes = votes;
  }

  private validateRadar(radar: Radar) {
    if (radar == null) {
      throw new Error('Los votos deben pertenecer a un radar');
    }
    if (radar.closed) {
      throw new Error('El radar para el cual desea generar un voto se encuentra cerrado');
    }
    this.radar = radar;
  }
}
