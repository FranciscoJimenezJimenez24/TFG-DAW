import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Goleador } from '../interfaces/goleador';
import { Asistidor } from '../interfaces/asistidor';
import { TarjetasAmarillas } from '../interfaces/tarjetas-amarillas';
import { TarjetasRojas } from '../interfaces/tarjetas-rojas';

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


}
