import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  constructor(private http: HttpClient) { }

  getMaximosGoleadoresTemporadaLiga(idLiga: number, idTemporada: number): Observable<Goleador> {
    return this.http.get<Goleador>(`http://127.0.0.1:8000/api/jugadores/goleadores?liga_id=${idLiga}&temporada_id=${idTemporada}`);
  }
  getMaximosAsistidoresTemporadaLiga(idLiga: number, idTemporada: number): Observable<Asistidor> {
    return this.http.get<Asistidor>(`http://127.0.0.1:8000/api/jugadores/asistidores?liga_id=${idLiga}&temporada_id=${idTemporada}`);
  }
  getMaximosTarjetasAmarillasTemporadaLiga(idLiga: number, idTemporada: number): Observable<TarjetasAmarillas> {
    return this.http.get<TarjetasAmarillas>(`http://127.0.0.1:8000/api/jugadores/tarjetas-amarillas?liga_id=${idLiga}&temporada_id=${idTemporada}`);
  }
  getMaximosTarjetasRojasTemporadaLiga(idLiga: number, idTemporada: number): Observable<TarjetasRojas> {
    return this.http.get<TarjetasRojas>(`http://127.0.0.1:8000/api/jugadores/tarjetas-rojas?liga_id=${idLiga}&temporada_id=${idTemporada}`);
  }

  getMaximosGoleadoresTemporada(idTemporada: number): Observable<Goleador> {
    return this.http.get<Goleador>(`http://127.0.0.1:8000/api/jugadores/goleadores/temporada/${idTemporada}`);
  }
  getMaximosAsistidoresTemporada(idTemporada: number): Observable<Asistidor> {
    return this.http.get<Asistidor>(`http://127.0.0.1:8000/api/jugadores/asistidores/temporada/${idTemporada}`);
  }
  getMaximosTarjetasAmarillasTemporada(idTemporada: number): Observable<TarjetasAmarillas> {
    return this.http.get<TarjetasAmarillas>(`http://127.0.0.1:8000/api/jugadores/tarjetas-amarillas/temporada/${idTemporada}`);
  }
  getMaximosTarjetasRojasTemporada(idTemporada: number): Observable<TarjetasRojas> {
    return this.http.get<TarjetasRojas>(`http://127.0.0.1:8000/api/jugadores/tarjetas-rojas/temporada/${idTemporada}`);
  }
  getMaximasParadasTemporada(idTemporada: number): Observable<Paradas> {
    return this.http.get<Paradas>(`http://127.0.0.1:8000/api/jugadores/paradas/temporada/${idTemporada}`);
  }
  getMaximasIntercepcionesTemporada(idTemporada: number): Observable<Intercepciones> {
    return this.http.get<Intercepciones>(`http://127.0.0.1:8000/api/jugadores/intercepciones/temporada/${idTemporada}`);
  }
  getMaximosPasesCompletosTemporada(idTemporada: number): Observable<PasesCompletos> {
    return this.http.get<PasesCompletos>(`http://127.0.0.1:8000/api/jugadores/pases-completos/temporada/${idTemporada}`);
  }
  getMaximosPasesTotalesTemporada(idTemporada: number): Observable<PasesTotales> {
    return this.http.get<PasesTotales>(`http://127.0.0.1:8000/api/jugadores/pases-totales/temporada/${idTemporada}`);
  }
  getMaximosEntradasTemporada(idTemporada: number): Observable<Entradas> {
    return this.http.get<Entradas>(`http://127.0.0.1:8000/api/jugadores/entradas/temporada/${idTemporada}`);
  }
  getMaximasFaltasTemporada(idTemporada: number): Observable<Faltas> {
    return this.http.get<Faltas>(`http://127.0.0.1:8000/api/jugadores/faltas/temporada/${idTemporada}`);
  }
  getMaximosDespejesTemporada(idTemporada: number): Observable<Despejes> {
    return this.http.get<Despejes>(`http://127.0.0.1:8000/api/jugadores/despejes/temporada/${idTemporada}`);
  }
  getMaximosDuelosGanadosTemporada(idTemporada: number): Observable<DuelosGanados> {
    return this.http.get<DuelosGanados>(`http://127.0.0.1:8000/api/jugadores/duelos-ganados/temporada/${idTemporada}`);
  }

  getJugadoresEquipo(idEquipo: number): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(`http://127.0.0.1:8000/api/jugadores/equipos/${idEquipo}`);
  }

  getJugador(idJugador:number):Observable<Jugador>{
    return this.http.get<Jugador>(`http://127.0.0.1:8000/api/jugadores/${idJugador}`);
  }

  getEstadisticasJugador(idJugador:number):Observable<EstadisticasJugador[]>{
    return this.http.get<EstadisticasJugador[]>(`http://127.0.0.1:8000/api/jugadores/${idJugador}/estadisticas`);
  }

  getAllGolesUltimaTemporada():Observable<number>{
    return this.http.get<number>(`http://127.0.0.1:8000/api/jugadores/allGoles`);
  }

  getNumeroJugadores():Observable<number>{
    return this.http.get<number>(`http://127.0.0.1:8000/api/jugadores/numTodos`);
  }

  getJugadorByNombre(nombre: string): Observable<Jugador> {
    // Primero, extraer solo el nombre del archivo si es una URL completa
    const nombreJugador = nombre.split('/').pop() || nombre;
    return this.http.get<Jugador>(`http://127.0.0.1:8000/api/jugadores/nombre?nombre=${encodeURIComponent(nombreJugador)}`);
  }
}
