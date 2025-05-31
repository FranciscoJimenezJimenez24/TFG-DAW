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
import { map } from 'rxjs';

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

  tipoEstadistica: string = '';
  temporadaId: number = 0;
  jugadores: any[] = [];
  titulo: string = '';
  propiedadMostrar: string = '';

  constructor(
    private route: ActivatedRoute,
    private jugadoresService: JugadoresService,
    private puntuacionesService: PuntuacionesService
  ) {
    this.route.queryParams.subscribe(params => {
      this.tipoEstadistica = params['tipo'];
      this.temporadaId = params['temporada'];
      this.loadData();
    });
  }

  loadData() {
    switch(this.tipoEstadistica) {
      case 'puntuacion':
        this.titulo = 'Puntuaciones';
        this.propiedadMostrar = 'puntuacion';
        this.puntuacionesService.getMejoresPuntuacionesTemporada(this.temporadaId)
          .pipe(map(data => Array.isArray(data) ? data : []))
          .subscribe(data => this.jugadores = data);
        break;
      case 'goles':
        this.titulo = 'Goleadores';
        this.propiedadMostrar = 'goles';
        this.jugadoresService.getMaximosGoleadoresTemporada(this.temporadaId)
          .pipe(map(data => Array.isArray(data) ? data : []))
          .subscribe(data => this.jugadores = data);
        break;
      case 'asistidores':
        this.titulo = 'Asistidores';
        this.propiedadMostrar = 'asistencias';
        this.jugadoresService.getMaximosAsistidoresTemporada(this.temporadaId)
          .pipe(map(data => Array.isArray(data) ? data : []))
          .subscribe(data => this.jugadores = data);
        break;
      case 'tarjetas-amarillas':
        this.titulo = 'Tarjetas Amarillas';
        this.propiedadMostrar = 'tarjetasAmarillas';
        this.jugadoresService.getMaximosTarjetasAmarillasTemporada(this.temporadaId)
          .pipe(map(data => Array.isArray(data) ? data : []))
          .subscribe(data => this.jugadores = data);
        break;
      case 'tarjetas-rojas':
        this.titulo = 'Tarjetas Rojas';
        this.propiedadMostrar = 'tarjetasRojas';
        this.jugadoresService.getMaximosTarjetasRojasTemporada(this.temporadaId)
          .pipe(map(data => Array.isArray(data) ? data : []))
          .subscribe(data => this.jugadores = data);
        break;
      case 'paradas':
        this.titulo = 'Paradas';
        this.propiedadMostrar = 'paradas';
        this.jugadoresService.getMaximasParadasTemporada(this.temporadaId)
          .pipe(map(data => Array.isArray(data) ? data : []))
          .subscribe(data => this.jugadores = data);
        break;
      case 'intercepciones':
        this.titulo = 'Intercepciones';
        this.propiedadMostrar = 'intercepciones';
        this.jugadoresService.getMaximasIntercepcionesTemporada(this.temporadaId)
          .pipe(map(data => Array.isArray(data) ? data : []))
          .subscribe(data => this.jugadores = data);
        break;
      case 'pases-completos':
        this.titulo = 'Pases Completos';
        this.propiedadMostrar = 'pasesCompletos';
        this.jugadoresService.getMaximosPasesCompletosTemporada(this.temporadaId)
          .pipe(map(data => Array.isArray(data) ? data : []))
          .subscribe(data => this.jugadores = data);
        break;
      case 'pases-totales':
        this.titulo = 'Pases Totales';
        this.propiedadMostrar = 'pasesTotales';
        this.jugadoresService.getMaximosPasesTotalesTemporada(this.temporadaId)
          .pipe(map(data => Array.isArray(data) ? data : []))
          .subscribe(data => this.jugadores = data);
        break;
      case 'entradas':
        this.titulo = 'Entradas';
        this.propiedadMostrar = 'entradas';
        this.jugadoresService.getMaximosEntradasTemporada(this.temporadaId)
          .pipe(map(data => Array.isArray(data) ? data : []))
          .subscribe(data => this.jugadores = data);
        break;
      case 'faltas':
        this.titulo = 'Faltas';
        this.propiedadMostrar = 'faltas';
        this.jugadoresService.getMaximasFaltasTemporada(this.temporadaId)
          .pipe(map(data => Array.isArray(data) ? data : []))
          .subscribe(data => this.jugadores = data);
        break;
      case 'despejes':
        this.titulo = 'Despejes';
        this.propiedadMostrar = 'despejes';
        this.jugadoresService.getMaximosDespejesTemporada(this.temporadaId)
          .pipe(map(data => Array.isArray(data) ? data : []))
          .subscribe(data => this.jugadores = data);
        break;
      case 'duelos-ganados':
        this.titulo = 'Duelos Ganados';
        this.propiedadMostrar = 'duelosGanados';
        this.jugadoresService.getMaximosDuelosGanadosTemporada(this.temporadaId)
          .pipe(map(data => Array.isArray(data) ? data : []))
          .subscribe(data => this.jugadores = data);
        break;
      default:
        this.titulo = 'Estadísticas';
        this.jugadores = [];
    }
  }

  getValorMostrar(jugador: any): number {
    return jugador[this.propiedadMostrar] || 0;
  }

}
