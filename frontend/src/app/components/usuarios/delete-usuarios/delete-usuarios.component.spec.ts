import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUsuariosComponent } from './delete-usuarios.component';

describe('DeleteUsuariosComponent', () => {
  let component: DeleteUsuariosComponent;
  let fixture: ComponentFixture<DeleteUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
