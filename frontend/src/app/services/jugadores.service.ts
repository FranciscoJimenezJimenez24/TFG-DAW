import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Goleador } from '../interfaces/goleador';
import { Asistidor } from '../interfaces/asistidor';
import { TarjetasAmarillas } from '../interfaces/tarjetas-amarillas';
import { TarjetasRojas } from '../interfaces/tarjetas-rojas';
import { Jugador } from '../interfaces/jugador';
import { EstadisticasJugador } from '../interfaces/estadisticas-jugador';

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

  getJugadoresEquipo(idEquipo: number): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(`http://127.0.0.1:8000/api/jugadores/equipos/${idEquipo}`);
  }

  getJugador(idJugador:number):Observable<Jugador>{
    return this.http.get<Jugador>(`http://127.0.0.1:8000/api/jugadores/${idJugador}`);
  }

  getEstadisticasJugador(idJugador:number):Observable<EstadisticasJugador[]>{
    return this.http.get<EstadisticasJugador[]>(`http://127.0.0.1:8000/api/jugadores/${idJugador}/estadisticas`);
  }


}
