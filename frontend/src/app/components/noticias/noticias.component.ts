import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Noticia } from '../../interfaces/noticia';
import { CommonModule } from '@angular/common';
import { CardNoticiaComponent } from '../cards/card-noticia/card-noticia.component';
import { AddNoticiaComponent } from './add-noticia/add-noticia.component';

@Component({
  selector: 'app-noticias',
  standalone: true,
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css',
  imports: [CommonModule,AddNoticiaComponent,CardNoticiaComponent],
})
export class NoticiasComponent implements OnInit {
  noticias: Noticia[] = [];

  constructor(private noticiasService: NoticiasService) { }

  ngOnInit(): void {
    this.getNoticias();
  }

  getNoticias() {
    this.noticiasService.getNoticias().subscribe((noticias) => {
      this.noticias = noticias;
    });
  }

  onNoticiaAdded(nuevaNoticia: Noticia) {
    this.noticias.push(nuevaNoticia);
  }
}
