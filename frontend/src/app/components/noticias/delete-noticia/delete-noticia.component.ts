import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Noticia } from '../../../interfaces/noticia';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;
@Component({
  selector: 'app-delete-noticia',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-noticia.component.html',
  styleUrl: './delete-noticia.component.css'
})
export class DeleteNoticiaComponent {
  @Input() noticia!: Noticia;
  @Output() noticiaEliminada = new EventEmitter<number>();

  confirmacionTexto: string = '';
  confirmacionValida: boolean = false;

  abrirModal() {
    this.confirmacionTexto = '';
    setTimeout(() => {
      const modalElement = document.getElementById('deleteNoticiaModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }, 100);
  }

  validarConfirmacion() {
    this.confirmacionValida = this.confirmacionTexto.toLowerCase() === 'eliminar';
  }

  confirmarEliminar() {
    if (this.confirmacionValida) {
      this.noticiaEliminada.emit(this.noticia.id);
      this.cerrarModal();
    }
  }

  cerrarModal() {
    const modalElement = document.getElementById('deleteNoticiaModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }
}
