import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarVoteComponent } from './radar-vote.component';
import {Axis} from "../../model/axis";
import {Vote} from "../../model/vote";

describe('RadarVoteComponent', () => {
  let component: RadarVoteComponent;
  let fixture: ComponentFixture<RadarVoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadarVoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadarVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('al apretar votar se envía el puntaje de cada arista', () => {
    const calidadTecnica = new Axis('Calidad técnica', 'La calidad técnica representa el eje...').registerVote(5);
    const calidadHumana = new Axis('Calidad humana', 'La calidad humana representa el eje...').registerVote(4);
    const ambienteLaboral = new Axis('Ambiente laboral', 'El ambiente laboral representa el eje...').registerVote(3);
    const axes = [
      calidadTecnica,
      calidadHumana,
      ambienteLaboral
    ];
    const votos = [
      {axis: calidadTecnica, vote: 5},
      {axis: calidadHumana, vote: 4},
      {axis: ambienteLaboral, vote: 3}
    ];

    component.radar.axes = axes;
    component.vote();

    expect(component.radar.votes).toContain(new Vote(component.radar, votos));
  });
});
