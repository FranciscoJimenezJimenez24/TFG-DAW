import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JugadoresService } from '../../services/jugadores.service';
import { PuntuacionesService } from '../../services/puntuaciones.service';
import { CommonModule } from '@angular/common';
import { Puntuacion } from '../../interfaces/puntuacion';
import { Goleador } from '../../interfaces/goleador';
import { Asistidor } from '../../interfaces/asistidor';
import { TarjetasAmarillas } from '../../interfaces/tarjetas-amarillas';
import { TarjetasRojas } from '../../interfaces/tarjetas-rojas';
import { Paradas } from '../../interfaces/paradas';
import { Intercepciones } from '../../interfaces/intercepciones';
import { PasesCompletos } from '../../interfaces/pases-completos';
import { PasesTotales } from '../../interfaces/pases-totales';
import { Entradas } from '../../interfaces/entradas';
import { Faltas } from '../../interfaces/faltas';
import { Despejes } from '../../interfaces/despejes';
import { DuelosGanados } from '../../interfaces/duelos-ganados';
import { map, Observable, switchMap } from 'rxjs';
import { Jugador } from '../../interfaces/jugador';
import { Equipo } from '../../interfaces/equipo';
import { EquiposService } from '../../services/equipos.service';
import { Router } from '@angular/router';

type Estadistica =
  Puntuacion |
  Goleador |
  Asistidor |
  TarjetasAmarillas |
  TarjetasRojas |
  Paradas |
  Intercepciones |
  PasesCompletos |
  PasesTotales |
  Entradas |
  Faltas |
  Despejes |
  DuelosGanados;
@Component({
  selector: 'app-jugadores-estadisticas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jugadores-estadisticas.component.html',
  styleUrl: './jugadores-estadisticas.component.css'
})
export class JugadoresEstadisticasComponent {

  players: Jugador[] = [];
  tipoEstadistica: string = '';
  temporadaId: number = 0;
  jugadores: any[] = [];
  titulo: string = '';
  propiedadMostrar: string = '';
  equiposPuntuacionesMap: Map<Puntuacion, Equipo> = new Map();
  jugadoresPuntuaciones: Jugador[] = [];
  equipos: Equipo[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jugadoresService: JugadoresService,
    private puntuacionesService: PuntuacionesService,
    private equiposService: EquiposService
  ) {
    this.route.queryParams.subscribe(params => {
      this.tipoEstadistica = params['tipo'];
      this.temporadaId = params['temporada'];
      this.loadData();
    });
  }

  loadData() {
    switch (this.tipoEstadistica) {
      case 'puntuacion':
        this.titulo = 'Puntuaciones';
        this.propiedadMostrar = 'puntuacion';
        this.puntuacionesService.getMejoresPuntuacionesTemporada(this.temporadaId)
          .pipe(map(data => Array.isArray(data) ? data : []))
          .subscribe(data => {
            this.jugadores = data
            this.jugadores.forEach((jugador: any) => {
              this.equiposService.getEquipo(jugador.equipo_id)
                .subscribe((equipo: Equipo) => {
                  this.equiposPuntuacionesMap.set(jugador, equipo);
                });
              this.jugadoresService.getJugador(jugador.jugador_id)
                .subscribe((jugadorData: Jugador) => {
                  this.jugadoresPuntuaciones.push(jugadorData);
                });
            });
          });
        break;
      case 'goles':
        this.titulo = 'Goleadores';
        this.propiedadMostrar = 'goles';
        this.cargarJugadores(this.jugadoresService.getMaximosGoleadoresTemporada(this.temporadaId));
        break;

      case 'asistencias':
        this.titulo = 'Asistidores';
        this.propiedadMostrar = 'asistencias';
        this.cargarJugadores(this.jugadoresService.getMaximosAsistidoresTemporada(this.temporadaId));
        break;

      case 'tarjetasAmarillas':
        this.titulo = 'Tarjetas Amarillas';
        this.propiedadMostrar = 'tarjetasAmarillas';
        this.cargarJugadores(this.jugadoresService.getMaximosTarjetasAmarillasTemporada(this.temporadaId));
        break;

      case 'tarjetasRojas':
        this.titulo = 'Tarjetas Rojas';
        this.propiedadMostrar = 'tarjetasRojas';
        this.cargarJugadores(this.jugadoresService.getMaximosTarjetasRojasTemporada(this.temporadaId));
        break;

      case 'paradas':
        this.titulo = 'Paradas';
        this.propiedadMostrar = 'paradas';
        this.cargarJugadores(this.jugadoresService.getMaximasParadasTemporada(this.temporadaId));
        break;

      case 'intercepciones':
        this.titulo = 'Intercepciones';
        this.propiedadMostrar = 'intercepciones';
        this.cargarJugadores(this.jugadoresService.getMaximasIntercepcionesTemporada(this.temporadaId));
        break;

      case 'pasesCompletos':
        this.titulo = 'Pases Completos';
        this.propiedadMostrar = 'pasesCompletos';
        this.cargarJugadores(this.jugadoresService.getMaximosPasesCompletosTemporada(this.temporadaId));
        break;

      case 'pasesTotales':
        this.titulo = 'Pases Totales';
        this.propiedadMostrar = 'pasesTotales';
        this.cargarJugadores(this.jugadoresService.getMaximosPasesTotalesTemporada(this.temporadaId));
        break;

      case 'entradas':
        this.titulo = 'Entradas';
        this.propiedadMostrar = 'entradas';
        this.cargarJugadores(this.jugadoresService.getMaximosEntradasTemporada(this.temporadaId));
        break;

      case 'faltas':
        this.titulo = 'Faltas';
        this.propiedadMostrar = 'faltas';
        this.cargarJugadores(this.jugadoresService.getMaximasFaltasTemporada(this.temporadaId));
        break;

      case 'despejes':
        this.titulo = 'Despejes';
        this.propiedadMostrar = 'despejes';
        this.cargarJugadores(this.jugadoresService.getMaximosDespejesTemporada(this.temporadaId));
        break;

      case 'duelosGanados':
        this.titulo = 'Duelos Ganados';
        this.propiedadMostrar = 'duelosGanados';
        this.cargarJugadores(this.jugadoresService.getMaximosDuelosGanadosTemporada(this.temporadaId));
        break;
      default:
        this.titulo = 'Estadísticas';
        this.jugadores = [];
    }
  }

  cargarJugadores(observable: Observable<any>) {
    observable
      .pipe(map(data => Array.isArray(data) ? data : []))
      .subscribe(data => {
        this.jugadores = data
        
        this.jugadores.forEach((jugador: any) => {
          this.jugadoresService.getJugadorByNombre(jugador.jugador)
            .subscribe((jugadorData: Jugador | null) => {
              this.players.push(jugadorData!);
            });
          this.equiposService.getEquipoByEscudo(jugador.equipoEscudo)
            .subscribe((equipo: Equipo) => {
              this.equipos.push(equipo);
            });
        });
      });
  }

  getValorMostrar(jugador: any): number {
    return jugador[(this.propiedadMostrar).replace(/([A-Z])/g, "_$1").toLowerCase()] || 0;
  }

  goToJugador(id: number) {
    console.log(this.players);
    
    this.router.navigate(['/jugadores', id]);
  }

  goToEquipo(id: number) {
    console.log(this.equipos);
    this.router.navigate(['/equipos', id]);
  }

}
