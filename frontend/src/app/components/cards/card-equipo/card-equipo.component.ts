import { Component, Input } from '@angular/core';
import { Equipo } from '../../../interfaces/equipo';

@Component({
  selector: 'app-card-equipo',
  standalone: true,
  imports: [],
  templateUrl: './card-equipo.component.html',
  styleUrl: './card-equipo.component.css'
})
export class CardEquipoComponent {
  @Input() equipo!: Equipo;
}
