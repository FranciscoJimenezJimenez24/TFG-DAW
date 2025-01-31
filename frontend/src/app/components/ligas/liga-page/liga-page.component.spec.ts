import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigaPageComponent } from './liga-page.component';

describe('LigaPageComponent', () => {
  let component: LigaPageComponent;
  let fixture: ComponentFixture<LigaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigaPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LigaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
