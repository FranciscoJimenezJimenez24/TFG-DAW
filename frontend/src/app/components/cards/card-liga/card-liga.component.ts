import { Component, Input } from '@angular/core';
import { Liga } from '../../../interfaces/liga';

@Component({
  selector: 'card-liga',
  standalone: true,
  imports: [],
  templateUrl: './card-liga.component.html',
  styleUrl: './card-liga.component.css'
})
export class CardLigaComponent {
  @Input() liga!: Liga;
}
