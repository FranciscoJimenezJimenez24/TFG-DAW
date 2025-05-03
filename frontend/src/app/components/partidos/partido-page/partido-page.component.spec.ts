import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidoPageComponent } from './partido-page.component';

describe('PartidoPageComponent', () => {
  let component: PartidoPageComponent;
  let fixture: ComponentFixture<PartidoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartidoPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartidoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
