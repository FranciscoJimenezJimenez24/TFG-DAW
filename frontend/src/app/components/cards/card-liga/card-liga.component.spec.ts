import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLigaComponent } from './card-liga.component';

describe('CardLigaComponent', () => {
  let component: CardLigaComponent;
  let fixture: ComponentFixture<CardLigaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardLigaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardLigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
