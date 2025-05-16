import { Component } from '@angular/core';
import { SolicitudesService } from '../../services/solicitudes.service';
import { CommonModule } from '@angular/common';
import { Solicitud } from '../../interfaces/solicitud';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css'
})
export class SolicitudesComponent {
  solicitudes: Solicitud[] = [];
  rolUsuario: string | null = localStorage.getItem("rol");

  constructor(private solicitudesService: SolicitudesService, private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    if (this.rolUsuario === 'admin') {
      this.solicitudesService.getSolicitudes().subscribe(s => this.solicitudes = s);      
    }
  }

  aprobar(solicitud: Solicitud) {
    this.usuariosService.getUsuarioByEmail(solicitud.email)
      .subscribe(usuario => {
        console.log(usuario);
        
        const updateUser: Usuario = {
          id: usuario.id, name: solicitud.nombre + " " + solicitud.apellido, email: usuario.email, password: usuario.password, rol: "journalist",
        };
        console.log(updateUser);
        
        this.usuariosService.updateUsuario(updateUser)
          .subscribe(
            () => {
              this.solicitudesService.deleteSolicitud(solicitud.id)
                .subscribe(() =>
                  this.solicitudes = this.solicitudes.filter(s => s.id !== solicitud.id)
                );
            }

          );
      });
    this.ngOnInit();
  }

  rechazar(id: number) {
    this.solicitudesService.deleteSolicitud(id)
      .subscribe(() =>
        this.solicitudes = this.solicitudes.filter(s => s.id !== id)
      );
    this.ngOnInit();
  }
}
