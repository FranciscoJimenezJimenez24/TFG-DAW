import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Usuario } from '../../../interfaces/usuario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-usuarios',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-usuarios.component.html',
  styleUrl: './add-usuarios.component.css'
})
export class AddUsuariosComponent {
  usuario: Usuario = { id: 0, email: '', name: '', password: '', rol: '' };
  error: string = '';

  @Output() usuarioAgregado = new EventEmitter<Usuario>();
  @ViewChild('content') content: any;

  constructor(private modalService: NgbModal) {}

  abrirModal() {
    this.error = '';
    this.usuario = { id: 0, email: '', name: '', password: '', rol: '' };
    this.modalService.open(this.content);
  }

  guardarUsuario() {
    this.error = '';
    this.usuarioAgregado.emit(this.usuario);
  }

  mostrarError(mensaje: string) {
    this.error = mensaje;
  }

  cerrarModal() {
    this.modalService.dismissAll();
  }
}