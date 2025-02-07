import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadorPageComponent } from './jugador-page.component';

describe('JugadorPageComponent', () => {
  let component: JugadorPageComponent;
  let fixture: ComponentFixture<JugadorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugadorPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JugadorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
