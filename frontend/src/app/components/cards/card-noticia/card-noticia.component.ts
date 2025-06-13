import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Noticia } from '../../../interfaces/noticia';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-noticia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-noticia.component.html',
  styleUrl: './card-noticia.component.css'
})
export class CardNoticiaComponent {
  @Input() noticia!: Noticia;
  @Output() editar = new EventEmitter<Noticia>();
  @Output() eliminar = new EventEmitter<Noticia>();

  mostrarOpciones = false;
  usuarioActual = localStorage.getItem("nombre");

  get esAutor(): boolean {
    return this.noticia.autor === this.usuarioActual;
  }

  editarNoticia(event: MouseEvent) {
    event.stopPropagation(); // Detiene la propagación
    this.editar.emit(this.noticia);
  }

  eliminarNoticia(event: MouseEvent) {
    event.stopPropagation();
    this.eliminar.emit(this.noticia);
  }

  get mostrarBotonesEdicion(): boolean {
    const rolUsuario = localStorage.getItem("rol");
    const modoPeriodista = localStorage.getItem("modoPeriodista");
    console.log('Validando botones:', {
      rol: rolUsuario,
      modo: modoPeriodista,
      esAutor: this.esAutor
    });

    if (rolUsuario === 'admin') return true;

    if (rolUsuario === 'journalist' && modoPeriodista === 'edicion' && this.esAutor) return true;

    return false;
  }

  get esDispositivoMovil(): boolean {
    return window.innerWidth <= 768;
  }

  // Mostrar siempre los botones en móvil si está en modo edición y es autor
  get mostrarBotonesSiempre(): boolean {
    return this.esDispositivoMovil && this.mostrarBotonesEdicion;
  }
}