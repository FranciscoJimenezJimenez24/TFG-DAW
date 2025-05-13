import { Component, Input } from '@angular/core';
import { Jugador } from '../../../interfaces/jugador';

@Component({
  selector: 'app-card-jugador',
  standalone: true,
  imports: [],
  templateUrl: './card-jugador.component.html',
  styleUrl: './card-jugador.component.css'
})
export class CardJugadorComponent {
  @Input() jugador!: Jugador;
}
