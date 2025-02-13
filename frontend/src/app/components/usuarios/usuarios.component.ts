import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../interfaces/usuario';
import { CommonModule } from '@angular/common';
import { AddUsuariosComponent } from './add-usuarios/add-usuarios.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, AddUsuariosComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuariosService.getUsuarios()
      .subscribe((usuarios) => {
        this.usuarios = usuarios;
      })
  }

  addUsuario(usuario: Usuario) {
    this.usuariosService.addUsuario(usuario)
      .subscribe((usuario) => {
        this.usuarios.push(usuario);
      })
  }

  updateUsuario(usuario: Usuario) {
    this.usuariosService.updateUsuario(usuario)
      .subscribe((usuario) => {
        this.usuarios = this.usuarios.map((u) => {
          if (u.id == usuario.id) {
            return usuario;
          }
          return u;
        });
      })
  }

  deleteUsuario(usuario: Usuario) {
    this.usuariosService.deleteUsuario(usuario.id)
      .subscribe(() => {
        this.usuarios = this.usuarios.filter((u) => {
          return u.id != usuario.id;
        });
      })
  }
}
