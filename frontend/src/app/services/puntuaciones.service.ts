import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Puntuacion } from '../interfaces/puntuacion';
import { environment } from 'environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class PuntuacionesService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {}

  private createOptions(): { headers: HttpHeaders } {
    return { headers: this.headers };
  }

  getPuntuacionesJugador(jugadorId: number) {
    return this.http.get<Puntuacion[]>(`${environment.apiUrl}/puntuaciones/jugador/${jugadorId}`, this.createOptions());
  }

  getMejoresPuntuacionesTemporada(idTemporada: number) {
    return this.http.get<Puntuacion[]>(`${environment.apiUrl}/puntuaciones/mejores/temporada/${idTemporada}`, this.createOptions());
  }

  getMejoresPuntuacionesUltimaTemporada() {
    return this.http.get<Puntuacion[]>(`${environment.apiUrl}/puntuaciones/mejores/ultimaTemperada`, this.createOptions());
  }
}
