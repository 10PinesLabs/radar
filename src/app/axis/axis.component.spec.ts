import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AxisComponent } from './axis.component';
import {Axis} from '../../model/axis';

describe('AxisComponent', () => {
  let component: AxisComponent;
  let fixture: ComponentFixture<AxisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
