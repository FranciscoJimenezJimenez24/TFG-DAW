import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Goleador } from '../interfaces/goleador';
import { Asistidor } from '../interfaces/asistidor';
import { TarjetasAmarillas } from '../interfaces/tarjetas-amarillas';
import { TarjetasRojas } from '../interfaces/tarjetas-rojas';
import { Jugador } from '../interfaces/jugador';
import { EstadisticasJugador } from '../interfaces/estadisticas-jugador';
import { Paradas } from '../interfaces/paradas';
import { Intercepciones } from '../interfaces/intercepciones';
import { PasesCompletos } from '../interfaces/pases-completos';
import { PasesTotales } from '../interfaces/pases-totales';
import { Entradas } from '../interfaces/entradas';
import { Faltas } from '../interfaces/faltas';
import { Despejes } from '../interfaces/despejes';
import { DuelosGanados } from '../interfaces/duelos-ganados';
import { environment } from 'environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  constructor(private http: HttpClient) { }

  getMaximosGoleadoresTemporadaLiga(idLiga: number, idTemporada: number): Observable<Goleador> {
    return this.http.get<Goleador>(`${environment.apiUrl}/jugadores/goleadores?liga_id=${idLiga}&temporada_id=${idTemporada}`);
  }
  getMaximosAsistidoresTemporadaLiga(idLiga: number, idTemporada: number): Observable<Asistidor> {
    return this.http.get<Asistidor>(`${environment.apiUrl}/jugadores/asistidores?liga_id=${idLiga}&temporada_id=${idTemporada}`);
  }
  getMaximosTarjetasAmarillasTemporadaLiga(idLiga: number, idTemporada: number): Observable<TarjetasAmarillas> {
    return this.http.get<TarjetasAmarillas>(`${environment.apiUrl}/jugadores/tarjetas-amarillas?liga_id=${idLiga}&temporada_id=${idTemporada}`);
  }
  getMaximosTarjetasRojasTemporadaLiga(idLiga: number, idTemporada: number): Observable<TarjetasRojas> {
    return this.http.get<TarjetasRojas>(`${environment.apiUrl}/jugadores/tarjetas-rojas?liga_id=${idLiga}&temporada_id=${idTemporada}`);
  }

  getMaximosGoleadoresTemporada(idTemporada: number): Observable<Goleador> {
    return this.http.get<Goleador>(`${environment.apiUrl}/jugadores/goleadores/temporada/${idTemporada}`);
  }
  getMaximosAsistidoresTemporada(idTemporada: number): Observable<Asistidor> {
    return this.http.get<Asistidor>(`${environment.apiUrl}/jugadores/asistidores/temporada/${idTemporada}`);
  }
  getMaximosTarjetasAmarillasTemporada(idTemporada: number): Observable<TarjetasAmarillas> {
    return this.http.get<TarjetasAmarillas>(`${environment.apiUrl}/jugadores/tarjetas-amarillas/temporada/${idTemporada}`);
  }
  getMaximosTarjetasRojasTemporada(idTemporada: number): Observable<TarjetasRojas> {
    return this.http.get<TarjetasRojas>(`${environment.apiUrl}/jugadores/tarjetas-rojas/temporada/${idTemporada}`);
  }
  getMaximasParadasTemporada(idTemporada: number): Observable<Paradas> {
    return this.http.get<Paradas>(`${environment.apiUrl}/jugadores/paradas/temporada/${idTemporada}`);
  }
  getMaximasIntercepcionesTemporada(idTemporada: number): Observable<Intercepciones> {
    return this.http.get<Intercepciones>(`${environment.apiUrl}/jugadores/intercepciones/temporada/${idTemporada}`);
  }
  getMaximosPasesCompletosTemporada(idTemporada: number): Observable<PasesCompletos> {
    return this.http.get<PasesCompletos>(`${environment.apiUrl}/jugadores/pases-completos/temporada/${idTemporada}`);
  }
  getMaximosPasesTotalesTemporada(idTemporada: number): Observable<PasesTotales> {
    return this.http.get<PasesTotales>(`${environment.apiUrl}/jugadores/pases-totales/temporada/${idTemporada}`);
  }
  getMaximosEntradasTemporada(idTemporada: number): Observable<Entradas> {
    return this.http.get<Entradas>(`${environment.apiUrl}/jugadores/entradas/temporada/${idTemporada}`);
  }
  getMaximasFaltasTemporada(idTemporada: number): Observable<Faltas> {
    return this.http.get<Faltas>(`${environment.apiUrl}/jugadores/faltas/temporada/${idTemporada}`);
  }
  getMaximosDespejesTemporada(idTemporada: number): Observable<Despejes> {
    return this.http.get<Despejes>(`${environment.apiUrl}/jugadores/despejes/temporada/${idTemporada}`);
  }
  getMaximosDuelosGanadosTemporada(idTemporada: number): Observable<DuelosGanados> {
    return this.http.get<DuelosGanados>(`${environment.apiUrl}/jugadores/duelos-ganados/temporada/${idTemporada}`);
  }

  getJugadoresEquipo(idEquipo: number): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(`${environment.apiUrl}/jugadores/equipos/${idEquipo}`);
  }

  getJugador(idJugador: number): Observable<Jugador> {
    return this.http.get<Jugador>(`${environment.apiUrl}/jugadores/${idJugador}`);
  }

  getEstadisticasJugador(idJugador: number): Observable<EstadisticasJugador[]> {
    return this.http.get<EstadisticasJugador[]>(`${environment.apiUrl}/jugadores/${idJugador}/estadisticas`);
  }

  getAllGolesUltimaTemporada(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/jugadores/allGoles`);
  }

  getNumeroJugadores(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/jugadores/numTodos`);
  }

  getJugadorByNombre(nombre: string): Observable<Jugador | null> {
    // Primero limpiar el nombre de posibles URLs
    const nombreLimpio = nombre.split('/').pop() || nombre;
    // Codificar solo los caracteres especiales, no los espacios
    const nombreJugador = encodeURIComponent(nombreLimpio).replace(/%20/g, ' ');
    return this.http.get<Jugador>(`http://127.0.0.1:8000/jugadores/nombre/${nombreJugador}`).pipe(
      catchError(error => {
        console.error('Error buscando jugador:', nombreJugador, error);
        return of(null); // Devuelve null si hay error
      })
    );
  }
}
