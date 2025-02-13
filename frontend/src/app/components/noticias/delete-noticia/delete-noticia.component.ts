import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Noticia } from '../../../interfaces/noticia';

@Component({
  selector: 'app-delete-noticia',
  standalone: true,
  imports: [],
  templateUrl: './delete-noticia.component.html',
  styleUrl: './delete-noticia.component.css'
})
export class DeleteNoticiaComponent {
  @Input() noticia!: Noticia;
  @Output() noticiaEliminada = new EventEmitter<number>();

  confirmarEliminar() {
    this.noticiaEliminada.emit(this.noticia.id);
  }
}
