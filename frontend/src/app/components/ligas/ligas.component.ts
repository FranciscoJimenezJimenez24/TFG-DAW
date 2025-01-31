import { Component, OnInit } from '@angular/core';
import { LigasService } from '../../services/ligas.service';
import { Liga } from '../../interfaces/liga';
import { CardLigaComponent } from '../cards/card-liga/card-liga.component';
import { RouterLink } from '@angular/router'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ligas',
  standalone: true,
  imports: [CardLigaComponent, RouterLink, CommonModule], 
  templateUrl: './ligas.component.html',
  styleUrl: './ligas.component.css'
})
export class LigasComponent implements OnInit {

  listaLigas: Liga[] = [];

  constructor(private ligaService: LigasService) { }

  ngOnInit(): void {
    this.getLigas();
  }

  getLigas() {
    this.ligaService.getLigas().subscribe(
      (data) => this.handleResponse(data),
      (error) => this.handleError(error)
    );
  }

  handleError(error: any): void {
    console.log(error);
  }

  handleResponse(data: any) {    
    this.listaLigas = data;
  }
}