import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarVoteComponent } from './radar-vote.component';
import {Axis} from "../../model/axis";
import {Vote} from "../../model/vote";

describe('RadarVoteComponent', () => {
  let component: RadarVoteComponent;
  let fixture: ComponentFixture<RadarVoteComponent>;
  let axes: Array<Axis>;

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
});
