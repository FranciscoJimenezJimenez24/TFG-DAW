import { Component, Input } from '@angular/core';
import { Partido } from '../../../interfaces/partido';
import { Equipo } from '../../../interfaces/equipo';

@Component({
  selector: 'app-card-tiny-partido',
  standalone: true,
  imports: [],
  templateUrl: './card-tiny-partido.component.html',
  styleUrl: './card-tiny-partido.component.css'
})
export class CardTinyPartidoComponent {
  @Input() partido!: Partido;
  @Input() equipoLocal!: Equipo;
  @Input() equipoVisitante!: Equipo;
}
