import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEquipoComponent } from './card-equipo.component';

describe('CardEquipoComponent', () => {
  let component: CardEquipoComponent;
  let fixture: ComponentFixture<CardEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEquipoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
