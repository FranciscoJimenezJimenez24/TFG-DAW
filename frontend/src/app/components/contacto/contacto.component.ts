import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SolicitudesService } from '../../services/solicitudes.service';
import { Solicitud } from '../../interfaces/solicitud';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent implements OnInit {
  contact = {
    nombre: '',
    apellido: '',
    email: localStorage.getItem("email") || ''
  };

  constructor(private solicitudesService: SolicitudesService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit() {
    if (this.contact.email) {
      const solicitud: Solicitud = {
        id: 0,
        nombre: this.contact.nombre,
        apellido: this.contact.apellido,
        email: this.contact.email,
      };

      this.solicitudesService.agregarSolicitud(solicitud).subscribe({
        next: (response) => {
          console.log("Solicitud agregada:", response);
          this.router.navigate(['/noticias']);
        },
        error: (error) => {
          console.error("Error al agregar solicitud:", error);
        }
      });
    }
  }

}
