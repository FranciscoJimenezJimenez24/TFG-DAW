import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CardPartidoComponent } from "../../cards/card-partido/card-partido.component";
import { JugadoresService } from '../../../services/jugadores.service';
import { Goleador } from '../../../interfaces/goleador';
import { CardTinyPartidoComponent } from '../../cards/card-tiny-partido/card-tiny-partido.component';
import { Asistidor } from '../../../interfaces/asistidor';
import { TarjetasAmarillas } from '../../../interfaces/tarjetas-amarillas';
import { TarjetasRojas } from '../../../interfaces/tarjetas-rojas';

@Component({
  selector: 'app-liga-page',
  standalone: true,
  imports: [CommonModule, CardTinyPartidoComponent],
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

  // Calendario
  showCalendar: boolean = false;
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth();
  months: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  weekdays: string[] = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  emptyDays: number[] = [];
  daysInMonth: number[] = [];

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

        return;
      });
    this.getEquiposLiga();
    this.getTemporadas();
    this.updateCalendar();
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
      });
  }

  onTemporadaChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    const idTemporada = Number(selectedValue);
    if (!isNaN(idTemporada)) {
      const selectedTemporada = this.temporadas.find(temporada => temporada.id === idTemporada);
      if (selectedTemporada) {
        this.currentYear = selectedTemporada.añoInicio;
        this.currentMonth = 7;
        this.updateCalendar();
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
    this.partidosService.getPartidosLigasTemporadas(this.liga.id, idTemporada)
      .subscribe(partidos => {
        this.partidos = partidos;
        this.getPuntos();
      });
    this.puntos = new Map();
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

  // Calendario
  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
  }

  getEquipoById(equipoId: number): Equipo {
    return this.equipos.find(equipo => equipo.id === equipoId) || { id: 0, nombre: 'Desconocido', escudo: 'default.jpg', ciudad: '', pais: '', liga_id: 0 };
  }

  partidosPorDia: Map<number, Partido[]> = new Map();  // Esta es la estructura para almacenar los partidos por día

  updateCalendar(): void {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const lastDate = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    this.emptyDays = Array(firstDay === 0 ? 6 : firstDay - 1).fill(0);
    this.daysInMonth = Array(lastDate).fill(0).map((_, i) => i + 1);

    // Inicializa el mapa de partidos por día
    this.partidosPorDia.clear();

    // Filtra los partidos que caen en el mes actual
    this.partidos.forEach(partido => {
      const partidoDate = new Date(partido.fecha);
      if (partidoDate.getFullYear() === this.currentYear && partidoDate.getMonth() === this.currentMonth) {
        const dia = partidoDate.getDate();
        if (!this.partidosPorDia.has(dia)) {
          this.partidosPorDia.set(dia, []);
        }
        this.partidosPorDia.get(dia)?.push(partido);
      }
    });
  }

  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.updateCalendar();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.updateCalendar();
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
}