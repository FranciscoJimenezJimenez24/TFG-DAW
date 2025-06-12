import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { LigasService } from '../../../services/ligas.service';
import { Router } from '@angular/router';
import { Liga } from '../../../interfaces/liga';
import { EquiposService } from '../../../services/equipos.service';
import { Equipo } from '../../../interfaces/equipo';
import { Temporada } from '../../../interfaces/temporada';
import { TemporadasService } from '../../../services/temporadas.service';
import { PartidosService } from '../../../services/partidos.service';
import { Partido } from '../../../interfaces/partido';
import { CommonModule } from '@angular/common';
import { JugadoresService } from '../../../services/jugadores.service';
import { Goleador } from '../../../interfaces/goleador';
import { Asistidor } from '../../../interfaces/asistidor';
import { TarjetasAmarillas } from '../../../interfaces/tarjetas-amarillas';
import { TarjetasRojas } from '../../../interfaces/tarjetas-rojas';
import { CardPartidoComponent } from '../../cards/card-partido/card-partido.component';

@Component({
  selector: 'app-liga-page',
  standalone: true,
  imports: [CommonModule, CardPartidoComponent, RouterLink],
  templateUrl: './liga-page.component.html',
  styleUrl: './liga-page.component.css'
})
export class LigaPageComponent implements OnInit {

  liga: Liga | null = null;
  equipos: Equipo[] = [];
  temporadas: Temporada[] = [];
  partidos: Partido[] = [];
  puntos: Map<Equipo, number> = new Map();
  maximosGoleadores: Goleador[] = [];
  maximosAsistidores: Asistidor[] = [];
  tarjetasAmarillas: TarjetasAmarillas[] = [];
  tarjetasRojas: TarjetasRojas[] = [];

  jornadas: { id: number, fecha: string }[] = [];
  jornadaSeleccionada: number | null = null;
  partidosAgrupados: { id: number, fecha: string, partidos: Partido[] }[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private ligasService: LigasService,
    private router: Router,
    private equiposService: EquiposService,
    private temporadasService: TemporadasService,
    private partidosService: PartidosService,
    private jugadoresService: JugadoresService,
    private zone: NgZone) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.ligasService.getLiga(id))
      )
      .subscribe(liga => {
        if (!liga) return this.router.navigate(['/ligas']);
        this.liga = liga;

        this.getEquiposLiga();
        this.getTemporadas();
        return;
      });
  }

  getEquiposLiga() {
    if (!this.liga) return;
    this.equiposService.getEquiposLigas(this.liga.id)
      .subscribe(equipos => {
        this.equipos = equipos;
      });
  }

  getTemporadas() {
    if (!this.liga) return;
    this.temporadasService.getTemporadas()
      .subscribe(temporadas => {
        this.temporadas = temporadas.map(temporada => {
          const yearStart = parseInt(temporada.nombre.split("/")[0].split(" ")[1]);
          return { ...temporada, añoInicio: yearStart };
        });
        // Si hay temporadas, seleccionamos la primera por defecto
        if (this.temporadas.length > 0) {
          const primeraTemporada = this.temporadas[0];
          // Creamos un evento falso para llamar a onTemporadaChange()
          const fakeEvent = {
            target: {
              value: primeraTemporada.id.toString()
            }
          } as unknown as Event;
          this.onTemporadaChange(fakeEvent);
        }
      });
  }

  onTemporadaChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    const idTemporada = Number(selectedValue);
    if (!isNaN(idTemporada)) {
      const selectedTemporada = this.temporadas.find(temporada => temporada.id === idTemporada);
      if (selectedTemporada) {
        this.getPartidos(idTemporada);
        this.getMaximosGoleadores(idTemporada);
        this.getMaximosAsistidores(idTemporada);
        this.getTarjetasAmarillas(idTemporada);
        this.getTarjetasRojas(idTemporada);
      }
    }
  }

  getPartidos(idTemporada: number): void {
    if (!this.liga) return;
    this.jornadaSeleccionada = null;
    this.partidosService.getPartidosLigasTemporadas(this.liga.id, idTemporada)
      .subscribe(partidos => {
        this.partidos = partidos.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
        this.agruparPartidos();
        this.getPuntos();
      });
  }

  agruparPartidos(): void {
    this.partidosAgrupados = [];

    this.partidos.forEach((partido) => {
      const fecha = new Date(partido.fecha).toISOString().split('T')[0];
      const jornada = this.partidosAgrupados.find(g => g.fecha === fecha);

      if (jornada) {
        jornada.partidos.push(partido);
      } else {
        this.partidosAgrupados.push({
          id: this.partidosAgrupados.length + 1,
          fecha,
          partidos: [partido]
        });
      }
    });

    this.jornadas = this.partidosAgrupados.map(j => ({ id: j.id, fecha: j.fecha }));

    if (this.partidosAgrupados.length > 0 && !this.jornadaSeleccionada) {
      this.jornadaSeleccionada = this.partidosAgrupados[0].id;
    }
  }

  onJornadaChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.jornadaSeleccionada = Number(selectedValue);
  }
  getPuntos() {
    if (!this.liga) return;
    this.equipos.forEach(equipo => {
      this.puntos.set(equipo, 0);
    });
    this.partidos.forEach(partido => {
      const equipoLocal = this.equipos.find(equipo => equipo.id === partido.equipo_local_id);
      const equipoVisitante = this.equipos.find(equipo => equipo.id === partido.equipo_visitante_id);

      if (equipoLocal && equipoVisitante) {
        if (partido.goles_local > partido.goles_visitante) {
          this.puntos.set(equipoLocal, (this.puntos.get(equipoLocal) || 0) + 3);
        } else if (partido.goles_visitante > partido.goles_local) {
          this.puntos.set(equipoVisitante, (this.puntos.get(equipoVisitante) || 0) + 3);
        } else {
          this.puntos.set(equipoLocal, (this.puntos.get(equipoLocal) || 0) + 1);
          this.puntos.set(equipoVisitante, (this.puntos.get(equipoVisitante) || 0) + 1);
        }
      }
    });
    const sortedPuntos = new Map(
      [...this.puntos.entries()].sort((a, b) => b[1] - a[1])
    );

    // Usamos NgZone para actualizar los puntos fuera del ciclo de Angular
    this.zone.runOutsideAngular(() => {
      this.puntos = sortedPuntos;
    });
  }

  getEquipoById(equipoId: number): Equipo {
    return this.equipos.find(equipo => equipo.id === equipoId) || { id: 0, nombre: 'Desconocido', escudo: 'default.jpg', ciudad: '', pais: 0, formacion: '', liga_id: 0 };
  }

  getMaximosGoleadores(idTemporada: number) {
    if (!this.liga) return;
    this.jugadoresService.getMaximosGoleadoresTemporadaLiga(this.liga.id, idTemporada)
      .subscribe(goleadores => {
        this.maximosGoleadores = Array.isArray(goleadores) ? goleadores : [];
      });
  }

  getMaximosAsistidores(idTemporada: number) {
    if (!this.liga) return;
    this.jugadoresService.getMaximosAsistidoresTemporadaLiga(this.liga.id, idTemporada)
      .subscribe(asistidores => {
        this.maximosAsistidores = Array.isArray(asistidores) ? asistidores : [];
      });
  }

  getTarjetasAmarillas(idTemporada: number) {
    if (!this.liga) return;
    this.jugadoresService.getMaximosTarjetasAmarillasTemporadaLiga(this.liga.id, idTemporada)
      .subscribe(tarjetasAmarillas => {
        this.tarjetasAmarillas = Array.isArray(tarjetasAmarillas) ? tarjetasAmarillas : [];
      });
  }

  getTarjetasRojas(idTemporada: number) {
    if (!this.liga) return;
    this.jugadoresService.getMaximosTarjetasRojasTemporadaLiga(this.liga.id, idTemporada)
      .subscribe(tarjetasRojas => {
        this.tarjetasRojas = Array.isArray(tarjetasRojas) ? tarjetasRojas : [];
      });
  }

  goToJugador(nombreJugador: string){
    this.jugadoresService.getJugadorByNombre(nombreJugador)
      .subscribe(jugador => {
        if (jugador) this.router.navigate(['/jugadores', jugador.id]);
      })
  }
}