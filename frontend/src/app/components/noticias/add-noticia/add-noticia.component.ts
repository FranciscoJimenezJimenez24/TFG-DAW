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
  nombreUsuario: string | null = localStorage.getItem("nombre")
  noticia: Noticia = { id: 0, titulo: '', descripcion: '', autor: this.nombreUsuario ?? '', fecha_publicacion: new Date().toISOString().split('T')[0] };

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

