import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPartidoComponent } from './card-partido.component';

describe('CardPartidoComponent', () => {
  let component: CardPartidoComponent;
  let fixture: ComponentFixture<CardPartidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPartidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
