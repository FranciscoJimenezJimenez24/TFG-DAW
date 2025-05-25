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
import { Puntuacion } from '../../../interfaces/puntuacion';
import { PuntuacionesService } from '../../../services/puntuaciones.service';

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
  puntuaciones: Puntuacion[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private jugadoresService: JugadoresService,
    private equiposService: EquiposService,
    private temporadasService: TemporadasService,
    private puntuacionesService: PuntuacionesService
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
          .subscribe(temporadas => {
            this.temporadas = temporadas;
          })
        this.equiposService.getEquipo(jugador.equipo_id)
          .subscribe(equipo => {
            this.equipoJugador = equipo;
          })
        this.getEstadisticasJugador();
        this.getPuntuaciones(this.jugador!.id);
        return;
      });
  }

  getEstadisticasJugador() {
    this.jugadoresService.getEstadisticasJugador(this.jugador!.id)
      .subscribe(estadisticas => {
        this.estadisticas = estadisticas;
      })
  }

  getTemporadaNombre(id: number): string {
    const temporada = this.temporadas.find(t => t.id === id);
    return temporada ? temporada.nombre : 'Desconocida';
  }

  getPuntuaciones(idJugador: number) {
    this.puntuacionesService.getPuntuacionesJugador(idJugador)
      .subscribe(puntuaciones => {
        this.puntuaciones = puntuaciones;
      });
  }
}
