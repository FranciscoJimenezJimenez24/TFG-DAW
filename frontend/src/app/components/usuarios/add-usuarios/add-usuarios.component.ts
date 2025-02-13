import { Component, EventEmitter, Output } from '@angular/core';
import { Usuario } from '../../../interfaces/usuario';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any; // 👈 Esto hace que Bootstrap esté disponible globalmente

@Component({
  selector: 'app-add-usuarios',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-usuarios.component.html',
  styleUrl: './add-usuarios.component.css'
})
export class AddUsuariosComponent {
  usuario: Usuario = { id: 0, email: '', name: '', password: '', rol: '' };

  @Output() usuarioAgregado = new EventEmitter<Usuario>();

  guardarUsuario() {
    this.usuarioAgregado.emit(this.usuario);
    this.cerrarModal();
  }

  cerrarModal() {
    const modalElement = document.getElementById('addUserModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement); // 👈 Aquí creamos el modal correctamente
      modal.hide();
    }
  }
}
