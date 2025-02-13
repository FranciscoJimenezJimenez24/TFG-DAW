import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../../interfaces/usuario';

declare var bootstrap: any;

@Component({
  selector: 'app-delete-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './delete-usuarios.component.html',
  styleUrl: './delete-usuarios.component.css'
})
export class DeleteUsuariosComponent {

  @Input() usuario!: Usuario;
  @Output() usuarioEliminado = new EventEmitter<number>();

  confirmarEliminar() {
    this.usuarioEliminado.emit(this.usuario.id);
    this.cerrarModal();
  }

  cerrarModal() {
    const modalElement = document.getElementById('deleteUserModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }
}
