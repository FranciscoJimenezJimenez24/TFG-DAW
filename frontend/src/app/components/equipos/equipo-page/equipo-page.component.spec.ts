import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoPageComponent } from './equipo-page.component';

describe('EquipoPageComponent', () => {
  let component: EquipoPageComponent;
  let fixture: ComponentFixture<EquipoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipoPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquipoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
