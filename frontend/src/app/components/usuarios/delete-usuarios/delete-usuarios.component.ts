import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../../interfaces/usuario';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-delete-usuarios',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-usuarios.component.html',
  styleUrl: './delete-usuarios.component.css'
})
export class DeleteUsuariosComponent {

  @Input() usuario!: Usuario;
  @Output() usuarioEliminado = new EventEmitter<number>();

  confirmacionTexto: string = '';
  confirmacionValida: boolean = false;

  abrirModal() {
    this.confirmacionTexto = '';
    setTimeout(() => {
      const modalElement = document.getElementById('deleteUserModal');
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
      this.usuarioEliminado.emit(this.usuario.id);
      this.cerrarModal();
    }
  }

  cerrarModal() {
    const modalElement = document.getElementById('deleteUserModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }
}
