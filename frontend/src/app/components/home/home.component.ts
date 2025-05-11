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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
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

  constructor(
    private partidosService: PartidosService,
    private puntuacionesService: PuntuacionesService,
    private jugadoresService: JugadoresService,
    private ligasService: LigasService,
    private noticiasService: NoticiasService
  ) { }

  ngOnInit(): void {

  }

  getUltimosPartidosPorLiga() {
    this.partidosService.getUltimosPartidosPorLiga()
      .subscribe((partidos) => {
        this.partidos = partidos;
      })
  }

  getMejoresPuntuacionesUltimaTemporada() {
    this.puntuacionesService.getMejoresPuntuacionesUltimaTemporada()
      .subscribe((puntuaciones) => {
        this.puntuaciones = puntuaciones;
        this.puntuaciones.forEach((puntuacion) => {
          this.jugadoresService.getJugador(puntuacion.jugador_id)
            .subscribe((jugador) => {
              this.jugadoresPuntuaciones.set(jugador, puntuacion);
            })
        })
      })
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
}
