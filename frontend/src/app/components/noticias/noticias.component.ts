import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Noticia } from '../../interfaces/noticia';
import { CommonModule } from '@angular/common';
import { CardNoticiaComponent } from '../cards/card-noticia/card-noticia.component';
import { AddNoticiaComponent } from './add-noticia/add-noticia.component';
import { Router, RouterLink } from '@angular/router';
import { DeleteNoticiaComponent } from './delete-noticia/delete-noticia.component';
import { EditNoticiaComponent } from './edit-noticia/edit-noticia.component';

@Component({
  selector: 'app-noticias',
  standalone: true,
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css',
  imports: [CommonModule, AddNoticiaComponent, CardNoticiaComponent, DeleteNoticiaComponent, EditNoticiaComponent, AddNoticiaComponent, RouterLink],
})
export class NoticiasComponent implements OnInit {
  noticias: Noticia[] = [];
  noticiaAEliminar: Noticia | null = null;
  mostrarFormulario = false;
  rolUsuario: string | null = localStorage.getItem("rol");
  modoPeriodista: 'lectura' | 'edicion' = 'lectura';

  @ViewChild(AddNoticiaComponent) addNoticiaComponent!: AddNoticiaComponent;
  @ViewChild(EditNoticiaComponent) editNoticiaComponent!: EditNoticiaComponent;
  @ViewChild(DeleteNoticiaComponent) deleteNoticiaComponent!: DeleteNoticiaComponent;

  noticiaSeleccionada: Noticia = { id: 0, titulo: '', descripcion: '', autor: '', fecha_publicacion: '' };

  constructor(private noticiasService: NoticiasService, private router: Router) { }

  ngOnInit(): void {
    this.modoPeriodista = localStorage.getItem("modoPeriodista") as 'lectura' | 'edicion' || 'lectura';
    this.cargarNoticiasSegunModo();
  }

  cargarNoticiasSegunModo() {
    const usuarioActual = localStorage.getItem("nombre");

    if (this.rolUsuario === 'journalist' && this.modoPeriodista === 'edicion' && usuarioActual) {
      // Modo edición: cargar solo las noticias del autor
      this.noticiasService.getNoticiaByAutor(usuarioActual).subscribe(noticias => {
        this.noticias = noticias;
      });
    } else {
      // Modo lectura o cualquier otro usuario: cargar todas las noticias
      this.getNoticias();
    }
  }

  cambiarModoPeriodista() {
    this.modoPeriodista = this.modoPeriodista === 'lectura' ? 'edicion' : 'lectura';
    localStorage.setItem("modoPeriodista", this.modoPeriodista);
    this.cargarNoticiasSegunModo(); // Recargar noticias al cambiar modo
  }

  getNoticias() {
    this.noticiasService.getNoticias().subscribe(noticias => this.noticias = noticias);
  }

  abrirModalAgregar() {
    this.addNoticiaComponent.noticia = { id: 0, titulo: '', descripcion: '', autor: '', fecha_publicacion: '' };
  }

  onNoticiaAdded(nuevaNoticia: Noticia) {
    this.noticiasService.addNoticia(nuevaNoticia).subscribe(noticia => this.noticias.push(noticia));
  }

  updateNoticia(noticia: Noticia) {
    this.noticiaSeleccionada = { ...noticia };
    setTimeout(() => {
      this.editNoticiaComponent.abrirModal();
    }, 100);
  }

  onNoticiaActualizado(noticia: Noticia) {
    this.noticiasService.updateNoticia(noticia).subscribe(() => {
      this.getNoticias();
    });
  }

  deleteNoticia(noticia: Noticia) {
    this.noticiaSeleccionada = { ...noticia };
    setTimeout(() => {
      this.deleteNoticiaComponent.abrirModal();
    }, 100);
  }

  onNoticiaEliminado(id: number) {
    this.noticiasService.deleteNoticia(id).subscribe(() => {
      this.getNoticias();
    });
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  gotoContacts() {
    this.router.navigate(['/contacto']);
  }

}
