import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { JugadoresService } from '../../../services/jugadores.service';
import { Equipo } from '../../../interfaces/equipo';
import { Jugador } from '../../../interfaces/jugador';
import { EstadisticasJugador } from '../../../interfaces/estadisticas-jugador';
import { EquiposService } from '../../../services/equipos.service';
import { Temporada } from '../../../interfaces/temporada';
import { TemporadasService } from '../../../services/temporadas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jugador-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jugador-page.component.html',
  styleUrl: './jugador-page.component.css'
})
export class JugadorPageComponent implements OnInit {

  jugador: Jugador | null = null;
  estadisticas: EstadisticasJugador[] = [];
  equipoJugador: Equipo | null = null;
  temporadas: Temporada[] = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private jugadoresService: JugadoresService,
    private equiposService: EquiposService,
    private temporadasService: TemporadasService
  ) { }
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.jugadoresService.getJugador(id))
      )
      .subscribe(jugador => {
        if (!jugador) return this.router.navigate(['/jugadores']);
        this.jugador = jugador;
        
        this.temporadasService.getTemporadas()
          .subscribe(temporadas=>{
            this.temporadas = temporadas;
          })
        this.equiposService.getEquipo(jugador.equipo_id)
          .subscribe(equipo=>{
            this.equipoJugador = equipo;
          })
        return;
      });
    this.getEstadisticasJugador();
  }

  getEstadisticasJugador(){
    this.jugadoresService.getEstadisticasJugador(this.jugador!.id)
      .subscribe(estadisticas=>{
        this.estadisticas = estadisticas;
      })
  }

  getTemporadaNombre(id: number): string {
    const temporada = this.temporadas.find(t => t.id === id);
    return temporada ? temporada.nombre : 'Desconocida';
  }
  

}
