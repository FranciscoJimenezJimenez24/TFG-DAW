import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTinyPartidoComponent } from './card-tiny-partido.component';

describe('CardTinyPartidoComponent', () => {
  let component: CardTinyPartidoComponent;
  let fixture: ComponentFixture<CardTinyPartidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTinyPartidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardTinyPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
