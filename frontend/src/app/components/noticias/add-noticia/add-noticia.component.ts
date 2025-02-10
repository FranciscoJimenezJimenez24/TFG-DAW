import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoticiasService } from '../../../services/noticias.service';
import { Noticia } from '../../../interfaces/noticia';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-noticia',
  standalone: true,
  templateUrl: './add-noticia.component.html',
  styleUrl: './add-noticia.component.css',
  imports: [CommonModule,ReactiveFormsModule],
})
export class AddNoticiaComponent {
  noticiaForm: FormGroup;

  @Output() noticiaAdded = new EventEmitter<Noticia>(); // Emite la nueva noticia

  constructor(private fb: FormBuilder, private noticiasService: NoticiasService) {
    this.noticiaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      contenido: ['', [Validators.required, Validators.minLength(20)]],
      autor: ['', Validators.required],
      fecha: [new Date().toISOString().split('T')[0], Validators.required]
    });
  }

  agregarNoticia() {
    if (this.noticiaForm.valid) {
      const nuevaNoticia: Noticia = this.noticiaForm.value;
      this.noticiasService.addNoticia(nuevaNoticia).subscribe(() => {
        this.noticiaAdded.emit(nuevaNoticia);
        this.noticiaForm.reset();
      });
    }
  }
}

