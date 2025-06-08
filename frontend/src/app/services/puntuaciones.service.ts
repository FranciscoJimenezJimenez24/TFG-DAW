import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Puntuacion } from '../interfaces/puntuacion';
import { environment } from 'environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class PuntuacionesService {

  constructor(private http: HttpClient) { }

  getPuntuacionesJugador(jugadorId: number) {
    return this.http.get<Puntuacion[]>(`${environment.apiUrl}/puntuaciones/jugador/${jugadorId}`);
  }

  getMejoresPuntuacionesTemporada(idTemporada: number) {
    return this.http.get<Puntuacion[]>(`${environment.apiUrl}/puntuaciones/mejores/temporada/${idTemporada}`);
  }
  
  getMejoresPuntuacionesUltimaTemporada(){
    return this.http.get<Puntuacion[]>(`${environment.apiUrl}/puntuaciones/mejores/ultimaTemperada`);
  }
}
