import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {}

  private createOptions(): { headers: HttpHeaders } {
    return { headers: this.headers };
  }

  getMaximosGoleadoresTemporadaLiga(idLiga: number, idTemporada: number): Observable<Goleador> {
    return this.http.get<Goleador>(`${environment.apiUrl}/jugadores/goleadores?liga_id=${idLiga}&temporada_id=${idTemporada}`, this.createOptions());
  }
  getMaximosAsistidoresTemporadaLiga(idLiga: number, idTemporada: number): Observable<Asistidor> {
    return this.http.get<Asistidor>(`${environment.apiUrl}/jugadores/asistidores?liga_id=${idLiga}&temporada_id=${idTemporada}`, this.createOptions());
  }
  getMaximosTarjetasAmarillasTemporadaLiga(idLiga: number, idTemporada: number): Observable<TarjetasAmarillas> {
    return this.http.get<TarjetasAmarillas>(`${environment.apiUrl}/jugadores/tarjetas-amarillas?liga_id=${idLiga}&temporada_id=${idTemporada}`, this.createOptions());
  }
  getMaximosTarjetasRojasTemporadaLiga(idLiga: number, idTemporada: number): Observable<TarjetasRojas> {
    return this.http.get<TarjetasRojas>(`${environment.apiUrl}/jugadores/tarjetas-rojas?liga_id=${idLiga}&temporada_id=${idTemporada}`, this.createOptions());
  }

  getMaximosGoleadoresTemporada(idTemporada: number): Observable<Goleador> {
    return this.http.get<Goleador>(`${environment.apiUrl}/jugadores/goleadores/temporada/${idTemporada}`, this.createOptions());
  }
  getMaximosAsistidoresTemporada(idTemporada: number): Observable<Asistidor> {
    return this.http.get<Asistidor>(`${environment.apiUrl}/jugadores/asistidores/temporada/${idTemporada}`, this.createOptions());
  }
  getMaximosTarjetasAmarillasTemporada(idTemporada: number): Observable<TarjetasAmarillas> {
    return this.http.get<TarjetasAmarillas>(`${environment.apiUrl}/jugadores/tarjetas-amarillas/temporada/${idTemporada}`, this.createOptions());
  }
  getMaximosTarjetasRojasTemporada(idTemporada: number): Observable<TarjetasRojas> {
    return this.http.get<TarjetasRojas>(`${environment.apiUrl}/jugadores/tarjetas-rojas/temporada/${idTemporada}`, this.createOptions());
  }
  getMaximasParadasTemporada(idTemporada: number): Observable<Paradas> {
    return this.http.get<Paradas>(`${environment.apiUrl}/jugadores/paradas/temporada/${idTemporada}`, this.createOptions());
  }
  getMaximasIntercepcionesTemporada(idTemporada: number): Observable<Intercepciones> {
    return this.http.get<Intercepciones>(`${environment.apiUrl}/jugadores/intercepciones/temporada/${idTemporada}`, this.createOptions());
  }
  getMaximosPasesCompletosTemporada(idTemporada: number): Observable<PasesCompletos> {
    return this.http.get<PasesCompletos>(`${environment.apiUrl}/jugadores/pases-completos/temporada/${idTemporada}`, this.createOptions());
  }
  getMaximosPasesTotalesTemporada(idTemporada: number): Observable<PasesTotales> {
    return this.http.get<PasesTotales>(`${environment.apiUrl}/jugadores/pases-totales/temporada/${idTemporada}`, this.createOptions());
  }
  getMaximosEntradasTemporada(idTemporada: number): Observable<Entradas> {
    return this.http.get<Entradas>(`${environment.apiUrl}/jugadores/entradas/temporada/${idTemporada}`, this.createOptions());
  }
  getMaximasFaltasTemporada(idTemporada: number): Observable<Faltas> {
    return this.http.get<Faltas>(`${environment.apiUrl}/jugadores/faltas/temporada/${idTemporada}`, this.createOptions());
  }
  getMaximosDespejesTemporada(idTemporada: number): Observable<Despejes> {
    return this.http.get<Despejes>(`${environment.apiUrl}/jugadores/despejes/temporada/${idTemporada}`, this.createOptions());
  }
  getMaximosDuelosGanadosTemporada(idTemporada: number): Observable<DuelosGanados> {
    return this.http.get<DuelosGanados>(`${environment.apiUrl}/jugadores/duelos-ganados/temporada/${idTemporada}`, this.createOptions());
  }

  getJugadoresEquipo(idEquipo: number): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(`${environment.apiUrl}/jugadores/equipos/${idEquipo}`, this.createOptions());
  }

  getJugador(idJugador: number): Observable<Jugador> {
    return this.http.get<Jugador>(`${environment.apiUrl}/jugadores/${idJugador}`, this.createOptions());
  }

  getEstadisticasJugador(idJugador: number): Observable<EstadisticasJugador[]> {
    return this.http.get<EstadisticasJugador[]>(`${environment.apiUrl}/jugadores/${idJugador}/estadisticas`, this.createOptions());
  }

  getAllGolesUltimaTemporada(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/jugadores/allGoles`, this.createOptions());
  }

  getNumeroJugadores(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/jugadores/numTodos`, this.createOptions());
  }

  getJugadorByNombre(nombre: string): Observable<Jugador | null> {
    // Primero limpiar el nombre de posibles URLs
    const nombreLimpio = nombre.split('/').pop() || nombre;
    // Codificar solo los caracteres especiales, no los espacios
    const nombreJugador = encodeURIComponent(nombreLimpio).replace(/%20/g, ' ');
    return this.http.get<Jugador>(`${environment.apiUrl}/jugadores/nombre/${nombreJugador}`, this.createOptions()).pipe(
      catchError(error => {
        console.error('Error buscando jugador:', nombreJugador, error);
        return of(null); // Devuelve null si hay error
      })
    );
  }
}
