import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarVoteComponent } from './radar-vote.component';

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
});
