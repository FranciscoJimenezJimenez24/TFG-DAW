import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardJugadorComponent } from './card-jugador.component';

describe('CardJugadorComponent', () => {
  let component: CardJugadorComponent;
  let fixture: ComponentFixture<CardJugadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardJugadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
