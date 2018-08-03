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

  it('al apretar uno de los checkboxes se registra el voto', () => {
    component.axis = new Axis('Calidad técnica', 'La calidad técnica representa el eje...');
    component.vote(5);

    expect(component.axis.vote).toBe(5);
  });
});
