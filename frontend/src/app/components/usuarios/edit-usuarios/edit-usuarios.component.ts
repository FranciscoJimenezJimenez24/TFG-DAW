import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../../interfaces/usuario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var bootstrap: any;

@Component({
  selector: 'app-edit-usuarios',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-usuarios.component.html',
  styleUrl: './edit-usuarios.component.css'
})
export class EditUsuariosComponent {
  @Input() usuario: Usuario = { id: 0, email: '', name: '', password: '', rol: '' };
  error: string = '';
  @Output() usuarioActualizado = new EventEmitter<Usuario>();

  constructor(private modalService: NgbModal) { }

  abrirModal() {
    this.error = '';
    const modalElement = document.getElementById('editUserModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  actualizarUsuario() {
    this.error = '';
    this.usuarioActualizado.emit(this.usuario);
  }

  mostrarError(mensaje: string) {
    this.error = mensaje;
  }

  cerrarModal() {
    this.error = '';
    const modalElement = document.getElementById('editUserModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }

}
