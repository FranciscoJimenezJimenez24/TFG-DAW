import { Component, OnInit } from '@angular/core';
import { Liga } from '../../interfaces/liga';
import { LigasService } from '../../services/ligas.service';
import { EquiposService } from '../../services/equipos.service';
import { Equipo } from '../../interfaces/equipo';
import { CommonModule } from '@angular/common';
import { CardEquipoComponent } from '../cards/card-equipo/card-equipo.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-equipos',
  standalone: true,
  imports: [CommonModule,RouterLink,CardEquipoComponent],
  templateUrl: './equipos.component.html',
  styleUrl: './equipos.component.css'
})
export class EquiposComponent implements OnInit{
  
  ligas: Liga[]= []; 
  equiposLiga: { [key: number]: Equipo[] } = {};

  constructor(
    private ligasService:LigasService,
    private equiposService: EquiposService
  ){}

  ngOnInit(): void {
    this.getLigas();
  }

  getLigas(){
    this.ligasService.getLigas()
      .subscribe(ligas=>{
        this.ligas=ligas;
        this.ligas.forEach(liga=>{
          this.getEquiposLiga(liga.id);
        })
      })
  }

  getEquiposLiga(idLiga:number){
    this.equiposService.getEquiposLigas(idLiga)
      .subscribe(equipos=>{
        this.equiposLiga[idLiga]=equipos;
      })
  }


}
