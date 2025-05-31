import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadoresEstadisticasComponent } from './jugadores-estadisticas.component';

describe('JugadoresEstadisticasComponent', () => {
  let component: JugadoresEstadisticasComponent;
  let fixture: ComponentFixture<JugadoresEstadisticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugadoresEstadisticasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JugadoresEstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
