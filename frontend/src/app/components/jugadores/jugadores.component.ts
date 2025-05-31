import { Component, HostListener, OnInit } from '@angular/core';
import { JugadoresService } from '../../services/jugadores.service';
import { PuntuacionesService } from '../../services/puntuaciones.service';
import { Jugador } from '../../interfaces/jugador';
import { Puntuacion } from '../../interfaces/puntuacion';
import { Temporada } from '../../interfaces/temporada';
import { TemporadasService } from '../../services/temporadas.service';
import { Goleador } from '../../interfaces/goleador';
import { TarjetasAmarillas } from '../../interfaces/tarjetas-amarillas';
import { Asistidor } from '../../interfaces/asistidor';
import { TarjetasRojas } from '../../interfaces/tarjetas-rojas';
import { Paradas } from '../../interfaces/paradas';
import { Intercepciones } from '../../interfaces/intercepciones';
import { PasesCompletos } from '../../interfaces/pases-completos';
import { PasesTotales } from '../../interfaces/pases-totales';
import { Entradas } from '../../interfaces/entradas';
import { Faltas } from '../../interfaces/faltas';
import { Despejes } from '../../interfaces/despejes';
import { DuelosGanados } from '../../interfaces/duelos-ganados';
import { CommonModule } from '@angular/common';
import { EquiposService } from '../../services/equipos.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-jugadores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jugadores.component.html',
  styleUrl: './jugadores.component.css'
})
export class JugadoresComponent implements OnInit {

  temporadas: Temporada[] = [];
  temporadaSeleccionada: Temporada | null = null;

  jugadores: Jugador[] = [];
  puntuaciones: Puntuacion[] = [];
  maximosGoleadores: Goleador[] = [];
  maximosAsistidores: Asistidor[] = [];
  tarjetasAmarillas: TarjetasAmarillas[] = [];
  tarjetasRojas: TarjetasRojas[] = [];
  maximasParadas: Paradas[] = [];
  maximasIntercepciones: Intercepciones[] = [];
  maximosPasesCompletados: PasesCompletos[] = [];
  maximosPasesTotales: PasesTotales[] = [];
  maximasEntradas: Entradas[] = [];
  maximasFaltas: Faltas[] = [];
  maximosDespejes: Despejes[] = [];
  maximosDuelosGanados: DuelosGanados[] = [];

  estadisticas = [
    { nombre: 'Puntuación', key: 'puntuacion', data: [] as any[], mostrarMas: false },
    { nombre: 'Goles', key: 'goles', data: [] as any[], mostrarMas: false },
    { nombre: 'Asistencias', key: 'asistencias', data: [] as any[], mostrarMas: false },
    { nombre: 'Tarjetas Amarillas', key: 'tarjetasAmarillas', data: [] as any[], mostrarMas: false },
    { nombre: 'Tarjetas Rojas', key: 'tarjetasRojas', data: [] as any[], mostrarMas: false },
    { nombre: 'Despejes', key: 'despejes', data: [] as any[], mostrarMas: false },
    { nombre: 'Paradas', key: 'paradas', data: [] as any[], mostrarMas: false },
    { nombre: 'Intercepciones', key: 'intercepciones', data: [] as any[], mostrarMas: false },
    { nombre: 'Pases Completos', key: 'pasesCompletos', data: [] as any[], mostrarMas: false },
    { nombre: 'Pases Totales', key: 'pasesTotales', data: [] as any[], mostrarMas: false },
    { nombre: 'Entradas', key: 'entradas', data: [] as any[], mostrarMas: false },
    { nombre: 'Faltas', key: 'faltas', data: [] as any[], mostrarMas: false },
    { nombre: 'Duelos Ganados', key: 'duelosGanados', data: [] as any[], mostrarMas: false }
  ];

  itemsPerRow = 3;
  currentGroup = 0;

  constructor(
    private jugadoresService: JugadoresService,
    private puntuacionesService: PuntuacionesService,
    private temporadasService: TemporadasService,
    private equiposService: EquiposService,
    private router: Router) { }

  ngOnInit(): void {
    this.getTemporadas();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.calculateItemsPerRow();
  }

  calculateItemsPerRow() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 992) {
      this.itemsPerRow = 3;
    } else if (screenWidth >= 768) {
      this.itemsPerRow = 2;
    } else {
      this.itemsPerRow = 1;
    }
  }

  getTemporadas() {
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
      const selectedTemporada = this.temporadas.find(t => t.id === idTemporada);
      if (selectedTemporada) {
        this.loadStatistics(idTemporada);
        this.temporadaSeleccionada = selectedTemporada;
      }
    }
  }

  async loadStatistics(idTemporada: number) {
    try {
      const [
        puntuaciones, goleadores, asistidores,
        tarjetasAmarillas, tarjetasRojas, despejes,
        paradas, intercepciones, pasesCompletos,
        pasesTotales, entradas, faltas, duelosGanados
      ] = await Promise.all([
        this.puntuacionesService.getMejoresPuntuacionesTemporada(idTemporada).toPromise(),
        this.jugadoresService.getMaximosGoleadoresTemporada(idTemporada).toPromise(),
        this.jugadoresService.getMaximosAsistidoresTemporada(idTemporada).toPromise(),
        this.jugadoresService.getMaximosTarjetasAmarillasTemporada(idTemporada).toPromise(),
        this.jugadoresService.getMaximosTarjetasRojasTemporada(idTemporada).toPromise(),
        this.jugadoresService.getMaximosDespejesTemporada(idTemporada).toPromise(),
        this.jugadoresService.getMaximasParadasTemporada(idTemporada).toPromise(),
        this.jugadoresService.getMaximasIntercepcionesTemporada(idTemporada).toPromise(),
        this.jugadoresService.getMaximosPasesCompletosTemporada(idTemporada).toPromise(),
        this.jugadoresService.getMaximosPasesTotalesTemporada(idTemporada).toPromise(),
        this.jugadoresService.getMaximosEntradasTemporada(idTemporada).toPromise(),
        this.jugadoresService.getMaximasFaltasTemporada(idTemporada).toPromise(),
        this.jugadoresService.getMaximosDuelosGanadosTemporada(idTemporada).toPromise()
      ]);

      // Asignar los datos a la estructura de estadísticas
      this.estadisticas[0].data = Array.isArray(puntuaciones) ? puntuaciones : [];
      this.estadisticas[1].data = Array.isArray(goleadores) ? goleadores : [];
      this.estadisticas[2].data = Array.isArray(asistidores) ? asistidores : [];
      this.estadisticas[3].data = Array.isArray(tarjetasAmarillas) ? tarjetasAmarillas : [];
      this.estadisticas[4].data = Array.isArray(tarjetasRojas) ? tarjetasRojas : [];
      this.estadisticas[5].data = Array.isArray(despejes) ? despejes : [];
      this.estadisticas[6].data = Array.isArray(paradas) ? paradas : [];
      this.estadisticas[7].data = Array.isArray(intercepciones) ? intercepciones : [];
      this.estadisticas[8].data = Array.isArray(pasesCompletos) ? pasesCompletos : [];
      this.estadisticas[9].data = Array.isArray(pasesTotales) ? pasesTotales : [];
      this.estadisticas[10].data = Array.isArray(entradas) ? entradas : [];
      this.estadisticas[11].data = Array.isArray(faltas) ? faltas : [];
      this.estadisticas[12].data = Array.isArray(duelosGanados) ? duelosGanados : []

      // Cargar jugadores para la tabla de puntuación
      this.loadJugadoresForPuntuacion();
    } catch (error) {
      console.error('Error loading statistics:', error);
    }
  }

  loadJugadoresForPuntuacion() {
    this.jugadores = [];
    this.estadisticas[0].data.forEach((puntuacion: any) => {
      this.jugadoresService.getJugador(puntuacion.jugador_id)
        .subscribe(jugador => this.jugadores.push(jugador));
    });
  }

  verMas(estadisticaKey: string) {
    const temporadaSeleccionada = this.temporadas.find(t => t.id === this.temporadaSeleccionada?.id);
    if (temporadaSeleccionada) {
      this.router.navigate(['/jugadores/estadisticas'], {
        queryParams: {
          tipo: estadisticaKey,
          temporada: temporadaSeleccionada.id
        }
      });
    }
  }

  getStatGroups(): number[] {
    const totalGroups = Math.ceil(this.estadisticas.length / this.itemsPerRow);
    return Array.from({ length: totalGroups }, (_, i) => i);
  }

  getVisibleStats() {
    const start = this.currentGroup * this.itemsPerRow;
    const end = start + this.itemsPerRow;
    return this.estadisticas.slice(start, end);
  }

  getMejoresPuntuaciones(idTemporada: number) {
    this.puntuacionesService.getMejoresPuntuacionesTemporada(idTemporada)
      .subscribe((puntuaciones: Puntuacion[]) => {
        this.puntuaciones = puntuaciones;
        this.getJugadores();
      });
  }

  getJugadores() {
    this.jugadores = [];
    this.puntuaciones.forEach(puntuacion => {
      this.jugadoresService.getJugador(puntuacion.jugador_id)
        .subscribe((jugador: Jugador) => {
          this.jugadores.push(jugador);
        });
    });
  }

  getMaximosGoleadoresTemporada(idTemporada: number) {
    this.jugadoresService.getMaximosGoleadoresTemporada(idTemporada)
      .subscribe((goleadores) => {
        this.maximosGoleadores = Array.isArray(goleadores) ? goleadores : [];
      })
  }

  getMaximosAsistidoresTemporada(idTemporada: number) {
    this.jugadoresService.getMaximosAsistidoresTemporada(idTemporada)
      .subscribe((asistidores) => {
        this.maximosAsistidores = Array.isArray(asistidores) ? asistidores : [];
      })
  }

  getMaximasTarjetasAmarillasTemporada(idTemporada: number) {
    this.jugadoresService.getMaximosTarjetasAmarillasTemporada(idTemporada)
      .subscribe((tarjetasAmarillas) => {
        this.tarjetasAmarillas = Array.isArray(tarjetasAmarillas) ? tarjetasAmarillas : [];
      })
  }

  getMaximasTarjetasRojasTemporada(idTemporada: number) {
    this.jugadoresService.getMaximosTarjetasRojasTemporada(idTemporada)
      .subscribe((tarjetasRojas) => {
        this.tarjetasRojas = Array.isArray(tarjetasRojas) ? tarjetasRojas : [];
      })
  }

  getMaximasParadasTemporada(idTemporada: number) {
    this.jugadoresService.getMaximasParadasTemporada(idTemporada)
      .subscribe((paradas) => {
        this.maximasParadas = Array.isArray(paradas) ? paradas : [];
        console.log(this.maximasParadas);

      });
  }

  getMaximasIntercepcionesTemporada(idTemporada: number) {
    this.jugadoresService.getMaximasIntercepcionesTemporada(idTemporada)
      .subscribe((intercepciones) => {
        this.maximasIntercepciones = Array.isArray(intercepciones) ? intercepciones : [];
      });
  }

  getMaximosPasesCompletadosTemporada(idTemporada: number) {
    this.jugadoresService.getMaximosPasesCompletosTemporada(idTemporada)
      .subscribe((pasesCompletos) => {
        this.maximosPasesCompletados = Array.isArray(pasesCompletos) ? pasesCompletos : [];
      });
  }

  getMaximosPasesTotalesTemporada(idTemporada: number) {
    this.jugadoresService.getMaximosPasesTotalesTemporada(idTemporada)
      .subscribe((pasesTotales) => {
        this.maximosPasesTotales = Array.isArray(pasesTotales) ? pasesTotales : [];

      });
  }

  getMaximasEntradasTemporada(idTemporada: number) {
    this.jugadoresService.getMaximosEntradasTemporada(idTemporada)
      .subscribe((entradas) => {
        this.maximasEntradas = Array.isArray(entradas) ? entradas : [];
      });
  }

  getMaximasFaltasTemporada(idTemporada: number) {
    this.jugadoresService.getMaximasFaltasTemporada(idTemporada)
      .subscribe((faltas) => {
        this.maximasFaltas = Array.isArray(faltas) ? faltas : [];

      });
  }

  getMaximosDespejesTemporada(idTemporada: number) {
    this.jugadoresService.getMaximosDespejesTemporada(idTemporada)
      .subscribe((despejes) => {
        this.maximosDespejes = Array.isArray(despejes) ? despejes : [];
      });
  }

  getMaximosDuelosGanadosTemporada(idTemporada: number) {
    this.jugadoresService.getMaximosDuelosGanadosTemporada(idTemporada)
      .subscribe((duelosGanados) => {
        this.maximosDuelosGanados = Array.isArray(duelosGanados) ? duelosGanados : [];

      });
  }

  getEquipo(idEquipo: number) {
    this.equiposService.getEquipo(idEquipo)
      .subscribe((equipo) => {
        return equipo.escudo;
      })
  }

  goToEquipo(idEquipo: number) {
    this.router.navigate(['/equipos', idEquipo]);
  }

  goToJugador(idJugador: number) {
    this.router.navigate(['/jugadores', idJugador]);
  }

  goToLiga(idLiga: number) {
    this.router.navigate(['/ligas', idLiga]);
  }
}
