import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../interfaces/usuario';
import { CommonModule } from '@angular/common';
import { AddUsuariosComponent } from './add-usuarios/add-usuarios.component';
import { EditUsuariosComponent } from './edit-usuarios/edit-usuarios.component';
import { DeleteUsuariosComponent } from './delete-usuarios/delete-usuarios.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, AddUsuariosComponent, EditUsuariosComponent, DeleteUsuariosComponent, AddUsuariosComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuarioSeleccionado: Usuario = { id: 0, email: '', name: '', password: '', rol: '' };

  @ViewChild(AddUsuariosComponent) addUsuarioComponent!: AddUsuariosComponent;
  @ViewChild(EditUsuariosComponent) editUsuarioComponent!: EditUsuariosComponent;
  @ViewChild(DeleteUsuariosComponent) deleteUsuarioComponent!: DeleteUsuariosComponent;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuariosService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  abrirModalAgregar() {
    this.addUsuarioComponent.abrirModal();
  }

  addUsuario(usuario: Usuario) {
    this.usuariosService.addUsuario(usuario)
      .subscribe({
        next: (usuario) => {
          this.usuarios.push(usuario);
          this.addUsuarioComponent.cerrarModal();
        },
        error: (err) => {
          if (err.error && err.error.message && err.error.message.includes('Duplicate entry')) {
            this.addUsuarioComponent.mostrarError('El email ya está en uso por otro usuario');
          } else {
            this.addUsuarioComponent.mostrarError('Ocurrió un error al agregar el usuario');
          }
        }
      });
  }

  updateUsuario(usuario: Usuario) {
    this.usuarioSeleccionado = { ...usuario };
    setTimeout(() => {
      this.editUsuarioComponent.abrirModal();
    }, 100);
  }

  deleteUsuario(usuario: Usuario) {
    this.usuarioSeleccionado = { ...usuario };
    setTimeout(() => {
      this.deleteUsuarioComponent.abrirModal();
    }, 100);
  }

  onUsuarioActualizado(usuario: Usuario) {
    this.usuariosService.updateUsuario(usuario).subscribe({
      next: () => {
        this.getUsuarios();
        this.editUsuarioComponent.cerrarModal();
      },
      error: (err) => {
        if (err.error && err.error.message && err.error.message.includes('Duplicate entry')) {
          this.editUsuarioComponent.mostrarError('El email ya está en uso por otro usuario');
        } else {
          this.editUsuarioComponent.mostrarError('Ocurrió un error al actualizar el usuario');
        }
      }
    });
  }

  onUsuarioEliminado(id: number) {
    this.usuariosService.deleteUsuario(id).subscribe(() => {
      this.getUsuarios();
    });
  }
}