import { Component, HostListener, OnInit } from '@angular/core';
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
import { Equipo } from '../../interfaces/equipo';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardJugadorComponent, CardPartidoComponent, CardNoticiaComponent, RouterLink],
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
  equipos: Equipo[] = [];

  numPartidos: number = 0;
  allGoles: number = 0;
  numJugadores: number = 0;
  numEquipos: number = 0;

  itemsPerPage: number = 2; // Valor inicial, se ajustará automáticamente

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
    this.calculateItemsPerPage();
    this.getAllGolesUltimaTemporada();
    this.getEquipos();
    this.getUltimosPartidosPorLiga();
    this.getMejoresPuntuacionesUltimaTemporada();
    this.getLigas();
    this.getUltimasNoticias();
    this.getNumeroPartidos();
    this.getNumeroJugadores();
    this.getNumeroEquipos();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.calculateItemsPerPage();
    this.updatePaginatedData();
  }

  getUltimosPartidosPorLiga() {
    this.partidosService.getUltimosPartidosPorLiga()
      .subscribe((partidos) => {
        this.partidos = partidos;
        this.partidosPaginated = this.partidos.slice(0, this.itemsPerPage);
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
                this.jugadoresPaginated = Array.from(this.jugadoresPuntuaciones.keys())
                  .slice(0, this.itemsPerPage);
              }
            });
        });
      });
  }

  getEquipos() {
    this.equiposService.getEquipos()
      .subscribe((equipos) => {
        this.equipos = equipos;
      })
  }

  getEquipo(idEquipo: number): Equipo | undefined {
    return this.equipos.find(e => e.id === idEquipo);
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

  calculateItemsPerPage() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1400) { // Pantallas XL
      this.itemsPerPage = 4;
    } else if (screenWidth >= 992) { // Pantallas LG
      this.itemsPerPage = 3;
    } else if (screenWidth >= 768) { // Pantallas MD
      this.itemsPerPage = 2;
    } else { // Pantallas pequeñas
      this.itemsPerPage = 1;
    }
  }

  updatePaginatedData() {
    this.partidosPaginated = this.partidos.slice(this.partidoIndex, this.partidoIndex + this.itemsPerPage);
    this.jugadoresPaginated = Array.from(this.jugadoresPuntuaciones.keys()).slice(
      this.jugadorIndex,
      this.jugadorIndex + this.itemsPerPage
    );
  }

  nextPartidos() {
    if (this.partidoIndex + this.itemsPerPage < this.partidos.length) {
      this.partidoIndex += this.itemsPerPage;
      this.partidosPaginated = this.partidos.slice(this.partidoIndex, this.partidoIndex + this.itemsPerPage);
    }
  }

  prevPartidos() {
    if (this.partidoIndex > 0) {
      this.partidoIndex = Math.max(0, this.partidoIndex - this.itemsPerPage);
      this.partidosPaginated = this.partidos.slice(this.partidoIndex, this.partidoIndex + this.itemsPerPage);
    }
  }

  nextJugadores() {
    const total = Array.from(this.jugadoresPuntuaciones.keys()).length;
    if (this.jugadorIndex + this.itemsPerPage < total) {
      this.jugadorIndex += this.itemsPerPage;
      this.jugadoresPaginated = Array.from(this.jugadoresPuntuaciones.keys()).slice(
        this.jugadorIndex,
        this.jugadorIndex + this.itemsPerPage
      );
    }
  }

  prevJugadores() {
    if (this.jugadorIndex > 0) {
      this.jugadorIndex = Math.max(0, this.jugadorIndex - this.itemsPerPage);
      this.jugadoresPaginated = Array.from(this.jugadoresPuntuaciones.keys()).slice(
        this.jugadorIndex,
        this.jugadorIndex + this.itemsPerPage
      );
    }
  }
}
