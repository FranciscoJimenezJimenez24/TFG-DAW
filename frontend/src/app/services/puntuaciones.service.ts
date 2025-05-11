import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Puntuacion } from '../interfaces/puntuacion';

@Injectable({
  providedIn: 'root'
})
export class PuntuacionesService {

  constructor(private http: HttpClient) { }

  getPuntuacionesJugador(jugadorId: number) {
    return this.http.get<Puntuacion[]>(`http://127.0.0.1:8000/api/puntuaciones/jugador/${jugadorId}`);
  }

  getMejoresPuntuacionesTemporada(idTemporada: number) {
    return this.http.get<Puntuacion[]>(`http://127.0.0.1:8000/api/puntuaciones/mejores/temporada/${idTemporada}`);
  }
  
  getMejoresPuntuacionesUltimaTemporada(){
    return this.http.get<Puntuacion[]>(`http://127.0.0.1:8000/api/puntuaciones/mejores/ultimaTemperada`);
  }
}
