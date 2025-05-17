import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiasService } from '../../../services/noticias.service';
import { switchMap } from 'rxjs';
import { Noticia } from '../../../interfaces/noticia';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-noticia-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './noticia-page.component.html',
  styleUrl: './noticia-page.component.css'
})
export class NoticiaPageComponent implements OnInit {

  noticia: Noticia | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private noticiasService: NoticiasService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.noticiasService.getNoticia(id))
      )
      .subscribe(noticia => {
        if (!noticia) return this.router.navigate(['/noticias']);
        this.noticia = noticia;
        return;
      });
  }
  goToNoticias() {
    this.router.navigate(['/noticias']);
  }
}
