import { Component, OnInit } from '@angular/core';
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
import { Equipo } from '../../interfaces/equipo';

@Component({
  selector: 'app-jugadores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jugadores.component.html',
  styleUrl: './jugadores.component.css'
})
export class JugadoresComponent implements OnInit {

  jugadores: Jugador[] = [];
  puntuaciones: Puntuacion[] = [];
  temporadas: Temporada[] = [];
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

  constructor(
    private jugadoresService: JugadoresService,
    private puntuacionesService: PuntuacionesService,
    private temporadasService: TemporadasService,
    private equiposService: EquiposService) { }

  ngOnInit(): void {
    this.getTemporadas();
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
      const selectedTemporada = this.temporadas.find(temporada => temporada.id === idTemporada);
      if (selectedTemporada) {
        this.getMejoresPuntuaciones(idTemporada);
        this.getMaximosDespejesTemporada(idTemporada);
        this.getMaximosGoleadoresTemporada(idTemporada);
        this.getMaximosAsistidoresTemporada(idTemporada);
        this.getMaximasTarjetasAmarillasTemporada(idTemporada);
        this.getMaximasTarjetasRojasTemporada(idTemporada);
        this.getMaximosPasesCompletadosTemporada(idTemporada);
        this.getMaximasIntercepcionesTemporada(idTemporada);
        this.getMaximasFaltasTemporada(idTemporada);
        this.getMaximosPasesTotalesTemporada(idTemporada);
        this.getMaximosDuelosGanadosTemporada(idTemporada);
        this.getMaximasParadasTemporada(idTemporada);
        this.getMaximasEntradasTemporada(idTemporada);
      }
    }
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

  getMaximosGoleadoresTemporada(idTemporada:number){
    this.jugadoresService.getMaximosGoleadoresTemporada(idTemporada)
      .subscribe((goleadores) => {
        this.maximosGoleadores = Array.isArray(goleadores) ? goleadores : [];
      })
  }

  getMaximosAsistidoresTemporada(idTemporada:number){
    this.jugadoresService.getMaximosAsistidoresTemporada(idTemporada)
      .subscribe((asistidores) => {
        this.maximosAsistidores = Array.isArray(asistidores) ? asistidores : [];
      })
  }

  getMaximasTarjetasAmarillasTemporada(idTemporada:number){
    this.jugadoresService.getMaximosTarjetasAmarillasTemporada(idTemporada)
      .subscribe((tarjetasAmarillas) => {
        this.tarjetasAmarillas = Array.isArray(tarjetasAmarillas) ? tarjetasAmarillas : [];
      })
  }

  getMaximasTarjetasRojasTemporada(idTemporada:number){
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

  getEquipo(idEquipo:number){
    this.equiposService.getEquipo(idEquipo)
      .subscribe((equipo) => {
        return equipo.escudo;
      })
  }
}
