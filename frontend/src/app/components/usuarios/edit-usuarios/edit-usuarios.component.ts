import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../../interfaces/usuario';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-edit-usuarios',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-usuarios.component.html',
  styleUrl: './edit-usuarios.component.css'
})
export class EditUsuariosComponent {
  @Input() usuario: Usuario = { id: 0, email: '', name: '', password: '', rol: '' };
  @Output() usuarioActualizado = new EventEmitter<Usuario>();

  actualizarUsuario() {
    this.usuarioActualizado.emit(this.usuario);
    this.cerrarModal();
  }

  cerrarModal() {
    const modalElement = document.getElementById('editUserModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }
}
