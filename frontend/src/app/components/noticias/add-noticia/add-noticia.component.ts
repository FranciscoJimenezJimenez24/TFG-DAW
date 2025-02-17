import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Noticia } from '../../../interfaces/noticia';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;
@Component({
  selector: 'app-add-noticia',
  standalone: true,
  templateUrl: './add-noticia.component.html',
  styleUrl: './add-noticia.component.css',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class AddNoticiaComponent {
  rolUsuario: string | null = localStorage.getItem("name")
  noticia: Noticia = { id: 0, titulo: '', contenido: '', autor: this.rolUsuario ?? '', fecha: new Date().toISOString().split('T')[0] };

  @Output() noticiaAgregada = new EventEmitter<Noticia>();

  guardarNoticia() {
    this.noticiaAgregada.emit(this.noticia);
    this.cerrarModal();
  }

  cerrarModal() {
    const modalElement = document.getElementById('addNoticiaModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.hide();
    }
  }
}

