import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { NoticiasService } from '../../../services/noticias.service';
import { Noticia } from '../../../interfaces/noticia';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-edit-noticia',
  standalone: true,
  templateUrl: './edit-noticia.component.html',
  styleUrl: './edit-noticia.component.css',
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
})
export class EditNoticiaComponent {
  nombreUsuario: string | null = localStorage.getItem("nombre")
  @Input() noticia: Noticia = { id: 0, titulo: '', descripcion: '', autor: this.nombreUsuario ?? '', fecha_publicacion: new Date().toISOString().split('T')[0] };
  @Output() noticiaActualizada = new EventEmitter<Noticia>();

  abrirModal() {
    setTimeout(() => {  
      const modalElement = document.getElementById('editNoticiaModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }, 100);
  }

  actualizarNoticia() {
    this.noticiaActualizada.emit(this.noticia);
    this.cerrarModal();
  }

  cerrarModal() {
    const modalElement = document.getElementById('editNoticiaModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }
}
