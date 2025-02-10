import { Component, Input } from '@angular/core';
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
}
