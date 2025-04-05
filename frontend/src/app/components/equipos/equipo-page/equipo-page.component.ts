import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquiposService } from '../../../services/equipos.service';
import { JugadoresService } from '../../../services/jugadores.service';
import { Equipo } from '../../../interfaces/equipo';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { Jugador } from '../../../interfaces/jugador';
import { CommonModule } from '@angular/common';
import { PaisesService } from '../../../services/paises.service';
import { PartidosService } from '../../../services/partidos.service';
import { Partido } from '../../../interfaces/partido';
import { ChunkPipe } from '../../../pipes/chunk.pipe';

@Component({
  selector: 'app-equipo-page',
  standalone: true,
  imports: [CommonModule, ChunkPipe],
  templateUrl: './equipo-page.component.html',
  styleUrls: ['./equipo-page.component.css'] // Corrige el 'styleUrl' a 'styleUrls'
})
export class EquipoPageComponent implements OnInit {

  equipo: Equipo | null = null;
  equipos: Equipo[] = [];
  jugadores: Jugador[] = [];
  bandera: string = '';
  partidos: Partido[] = [];
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();
  calendarDays: Date[] = [];
  partidosDelMes: { [key: string]: Partido[] } = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private jugadoresService: JugadoresService,
    private equiposService: EquiposService,
    private paisesService: PaisesService,
    private partidosService: PartidosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.equiposService.getEquipo(id))
      )
      .subscribe(equipo => {
        if (!equipo) return this.router.navigate(['/equipos']);
        this.equipo = equipo;
        this.getPartidosEquipo();
        this.generateCalendar();
        this.getJugadoresEquipo();
        this.getPaisEquipo();
        this.getEquiposLiga();
        return;
      });
  }

  getJugadoresEquipo() {
    if (this.equipo) {
      this.jugadoresService.getJugadoresEquipo(this.equipo.id)
        .subscribe(jugadores => {
          this.jugadores = jugadores;
          this.jugadores.forEach(jugador => this.getPaisJugador(jugador.pais_id));
        });
    }
  }

  getPaisEquipo() {
    this.paisesService.getPais(this.equipo!.pais)
      .subscribe(pais => {
        this.bandera = pais.bandera;
      });
  }

  banderasJugadores: { [key: number]: string } = {};

  getPaisJugador(id: number) {
    if (this.banderasJugadores[id]) {
      return;
    }
    this.paisesService.getPais(id)
      .subscribe(pais => {
        this.banderasJugadores[id] = pais.bandera;
      });
  }

  getPartidosEquipo() {
    if (this.equipo) {
      this.partidosService.getPartidosEquipo(this.equipo.id)
        .subscribe(partidos => {
          this.partidos = partidos;
          this.groupPartidosByDate(); // Agrupar partidos por fecha
        });
    }
  }

  groupPartidosByDate() {
    this.partidosDelMes = {};
    this.partidos.forEach(partido => {
      const dateKey = new Date(partido.fecha).toISOString().split('T')[0]; // Asegúrate de convertir la fecha
      if (!this.partidosDelMes[dateKey]) {
        this.partidosDelMes[dateKey] = [];
      }
      this.partidosDelMes[dateKey].push(partido);
    });
  }


  // Generar los días del calendario para el mes actual
  generateCalendar() {
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
    const totalDaysInMonth = lastDayOfMonth.getDate();

    // Ajustar el primer día de la semana para que Lunes sea el primer día (0 = Lunes, 6 = Domingo)
    let firstDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // Convertir Domingo (0) a 6, Lunes (1) a 0, etc.

    this.calendarDays = [];

    // Rellenar con los días del mes anterior para completar la primera semana
    const previousMonthLastDay = new Date(this.currentYear, this.currentMonth, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      this.calendarDays.push(new Date(this.currentYear, this.currentMonth - 1, previousMonthLastDay - i));
    }

    // Rellenar con los días del mes actual
    for (let day = 1; day <= totalDaysInMonth; day++) {
      this.calendarDays.push(new Date(this.currentYear, this.currentMonth, day));
    }

    // Rellenar con los días del siguiente mes para completar la última semana
    const lastDayOfWeek = (lastDayOfMonth.getDay() + 6) % 7; // Ajustar igual que firstDayOfWeek
    for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
      this.calendarDays.push(new Date(this.currentYear, this.currentMonth + 1, i));
    }
  }

  // Navegar a un mes anterior
  goToPreviousMonth() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar();
  }

  // Navegar a un mes siguiente
  goToNextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }

  // Verificar si hay partidos en un día específico
  getPartidosForDay(date: Date): Partido[] {
    const dateKey = date.toISOString().split('T')[0];
    return this.partidosDelMes[dateKey] || [];
  }

  getEquiposLiga() {
    if (this.equipo) {
      this.equiposService.getEquiposLigas(this.equipo.liga_id)
        .subscribe(equipos => {
          this.equipos = equipos;
        });
    }
  }

  getEscudoRival(partido: Partido) {
    if (partido.equipo_local_id !== this.equipo!.id) {
      return this.getEquipoEscudo(partido.equipo_local_id);
    } else {
      return this.getEquipoEscudo(partido.equipo_visitante_id);
    }
  }

  getEquipoEscudo(id: number) {
    return this.equipos.find(equipo => equipo.id === id)?.escudo;
  }

  getNombreRival(partido: Partido) {
    if (partido.equipo_local_id !== this.equipo!.id) {
      return this.getEquipoNombre(partido.equipo_local_id);
    } else {
      return this.getEquipoNombre(partido.equipo_visitante_id);
    }
  }

  getEquipoNombre(id: number) {
    return this.equipos.find(equipo => equipo.id === id)?.nombre;
  }
}