import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoticiasService } from '../../../services/noticias.service';
import { Noticia } from '../../../interfaces/noticia';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-noticia',
  standalone: true,
  templateUrl: './edit-noticia.component.html',
  styleUrl: './edit-noticia.component.css',
  imports: [CommonModule, ReactiveFormsModule],
})
export class EditNoticiaComponent implements OnInit {
  @Input() noticia!: Noticia;
  @Output() noticiaEditada = new EventEmitter<Noticia>();
  noticiaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.noticiaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      contenido: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  ngOnInit() {
    this.noticiaForm.patchValue(this.noticia);
  }

  editar() {
    if (this.noticiaForm.valid) {
      const noticiaEditada = { ...this.noticia, ...this.noticiaForm.value };
      this.noticiaEditada.emit(noticiaEditada);
    }
  }
}
