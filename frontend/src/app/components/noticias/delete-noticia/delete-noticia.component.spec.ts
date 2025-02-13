import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNoticiaComponent } from './delete-noticia.component';

describe('DeleteNoticiaComponent', () => {
  let component: DeleteNoticiaComponent;
  let fixture: ComponentFixture<DeleteNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteNoticiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
