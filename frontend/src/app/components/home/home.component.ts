import { Component, OnInit } from '@angular/core';
import { PartidosService } from '../../services/partidos.service';
import { Partido } from '../../interfaces/partido';
import { PuntuacionesService } from '../../services/puntuaciones.service';
import { Puntuacion } from '../../interfaces/puntuacion';
import { Jugador } from '../../interfaces/jugador';
import { JugadoresService } from '../../services/jugadores.service';
import { Liga } from '../../interfaces/liga';
import { LigasService } from '../../services/ligas.service';
import { NoticiasService } from '../../services/noticias.service';
import { Noticia } from '../../interfaces/noticia';
import { EquiposService } from '../../services/equipos.service';
import { CommonModule } from '@angular/common';
import { CardJugadorComponent } from '../cards/card-jugador/card-jugador.component';
import { CardPartidoComponent } from '../cards/card-partido/card-partido.component';
import { CardNoticiaComponent } from '../cards/card-noticia/card-noticia.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardJugadorComponent, CardPartidoComponent, CardNoticiaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  usuarioNombre: string | null = localStorage.getItem("nombre");

  partidos: Partido[] = [];
  puntuaciones: Puntuacion[] = [];
  jugadoresPuntuaciones: Map<Jugador, Puntuacion> = new Map();
  ligas: Liga[] = [];
  noticias: Noticia[] = [];

  numPartidos: number = 0;
  allGoles: number = 0;
  numJugadores: number = 0;
  numEquipos: number = 0;

  partidosPaginated: Partido[] = [];
  jugadoresPaginated: Jugador[] = [];
  partidoIndex = 0;
  jugadorIndex = 0;

  constructor(
    private partidosService: PartidosService,
    private puntuacionesService: PuntuacionesService,
    private jugadoresService: JugadoresService,
    private ligasService: LigasService,
    private noticiasService: NoticiasService,
    private equiposService: EquiposService
  ) { }

  ngOnInit(): void {
    this.getUltimosPartidosPorLiga();
    this.getMejoresPuntuacionesUltimaTemporada();
    this.getLigas();
    this.getUltimasNoticias();
    this.getNumeroPartidos();
    this.getNumeroJugadores();
    this.getNumeroEquipos();
  }

  getUltimosPartidosPorLiga() {
    this.partidosService.getUltimosPartidosPorLiga()
      .subscribe((partidos) => {
        this.partidos = partidos; 
        console.log(this.partidos);
               
        this.partidosPaginated = this.partidos.slice(0, 5);  // 👈 inicializamos
      });
  }

  getMejoresPuntuacionesUltimaTemporada() {
    this.puntuacionesService.getMejoresPuntuacionesUltimaTemporada()
      .subscribe((puntuaciones) => {
        this.puntuaciones = puntuaciones;
        let count = 0;
        this.puntuaciones.forEach((puntuacion) => {
          this.jugadoresService.getJugador(puntuacion.jugador_id)
            .subscribe((jugador) => {
              this.jugadoresPuntuaciones.set(jugador, puntuacion);
              count++;
              if (count === this.puntuaciones.length) {
                this.jugadoresPaginated = Array.from(this.jugadoresPuntuaciones.keys()).slice(0, 5);  // 👈 inicializamos cuando ya los tenemos todos
              }
            });
        });
      });
  }


  getLigas() {
    this.ligasService.getLigas()
      .subscribe((ligas) => {
        this.ligas = ligas;
      })
  }

  getUltimasNoticias() {
    this.noticiasService.getUltimasNoticas()
      .subscribe((noticias) => {
        this.noticias = noticias;
      })
  }

  getNumeroPartidos() {
    this.partidosService.getNumeroPartidos()
      .subscribe((numPartidos) => {
        this.numPartidos = numPartidos;
      })
  }

  getAllGolesUltimaTemporada() {
    this.jugadoresService.getAllGolesUltimaTemporada()
      .subscribe((goles) => {
        this.allGoles = goles;
      })
  }

  getNumeroJugadores() {
    this.jugadoresService.getNumeroJugadores()
      .subscribe((numJugadores) => {
        this.numJugadores = numJugadores;
      })
  }

  getNumeroEquipos() {
    this.equiposService.getNumeroEquipos()
      .subscribe((numEquipos) => {
        this.numEquipos = numEquipos;
      })
  }

  nextPartidos() {
    const total = this.partidos.length;
    this.partidoIndex = (this.partidoIndex + 5) % total;
    this.partidosPaginated = this.partidos.slice(this.partidoIndex, this.partidoIndex + 5);
  }

  prevPartidos() {
    const total = this.partidos.length;
    this.partidoIndex = (this.partidoIndex - 5 + total) % total;
    this.partidosPaginated = this.partidos.slice(this.partidoIndex, this.partidoIndex + 5);
  }

  nextJugadores() {
    const total = Array.from(this.jugadoresPuntuaciones.keys()).length;
    this.jugadorIndex = (this.jugadorIndex + 5) % total;
    this.jugadoresPaginated = Array.from(this.jugadoresPuntuaciones.keys()).slice(this.jugadorIndex, this.jugadorIndex + 5);
  }

  prevJugadores() {
    const total = Array.from(this.jugadoresPuntuaciones.keys()).length;
    this.jugadorIndex = (this.jugadorIndex - 5 + total) % total;
    this.jugadoresPaginated = Array.from(this.jugadoresPuntuaciones.keys()).slice(this.jugadorIndex, this.jugadorIndex + 5);
  }

}
