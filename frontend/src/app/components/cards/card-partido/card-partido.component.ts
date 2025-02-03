import { Component, Input } from '@angular/core';
import { Partido } from '../../../interfaces/partido';
import { Equipo } from '../../../interfaces/equipo';

@Component({
  selector: 'app-card-partido',
  standalone: true,
  imports: [],
  templateUrl: './card-partido.component.html',
  styleUrl: './card-partido.component.css'
})
export class CardPartidoComponent {
  @Input() partido!: Partido;
  @Input() equipoLocal!: Equipo;
  @Input() equipoVisitante!: Equipo;
}
