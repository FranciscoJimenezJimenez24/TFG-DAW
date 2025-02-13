import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Noticia } from '../../interfaces/noticia';
import { CommonModule } from '@angular/common';
import { CardNoticiaComponent } from '../cards/card-noticia/card-noticia.component';
import { AddNoticiaComponent } from './add-noticia/add-noticia.component';
import { Router } from '@angular/router';
import { DeleteNoticiaComponent } from './delete-noticia/delete-noticia.component';
import { EditNoticiaComponent } from './edit-noticia/edit-noticia.component';

@Component({
  selector: 'app-noticias',
  standalone: true,
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css',
  imports: [CommonModule, AddNoticiaComponent, CardNoticiaComponent, DeleteNoticiaComponent, EditNoticiaComponent],
})
export class NoticiasComponent implements OnInit {
  noticias: Noticia[] = [];
  noticiaSeleccionada: Noticia | null = null;
  noticiaAEliminar: Noticia | null = null;
  mostrarFormulario = false;
  rolUsuario: string | null = localStorage.getItem("rol"); // Obtiene el rol desde localStorage

  constructor(private noticiasService: NoticiasService, private router: Router) { }

  ngOnInit(): void {
    this.getNoticias();
  }

  getNoticias() {
    this.noticiasService.getNoticias().subscribe(noticias => this.noticias = noticias);
  }

  onNoticiaAdded(nuevaNoticia: Noticia) {
    this.noticias.push(nuevaNoticia);
    this.mostrarFormulario = false;
  }

  onNoticiaEditada(noticiaEditada: Noticia) {
    this.noticias = this.noticias.map(n => n.id === noticiaEditada.id ? noticiaEditada : n);
    this.noticiaSeleccionada = null;
  }

  onNoticiaEliminada(id: number) {
    if (id) {
      this.noticias = this.noticias.filter(n => n.id !== id);
    }
    this.noticiaAEliminar = null;
  }

  seleccionarNoticiaParaEditar(noticia: Noticia) {
    this.noticiaSeleccionada = noticia;
  }

  seleccionarNoticiaParaEliminar(noticia: Noticia) {
    this.noticiaAEliminar = noticia;
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  gotoContacts() {
    this.router.navigate(['/contacto']);
  }
}
