import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partido } from '../interfaces/partido';
import { environment } from 'environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {}

  private createOptions(): { headers: HttpHeaders } {
    return { headers: this.headers };
  }

  getPartido(id: number): Observable<Partido> {
    return this.http.get<Partido>(`${environment.apiUrl}/partidos/${id}`, this.createOptions());
  }

  getPartidosLigasTemporadas(idLiga: number, idTemporada: number): Observable<Partido[]> {
    return this.http.get<Partido[]>(`${environment.apiUrl}/partidos?liga_id=${idLiga}&temporada_id=${idTemporada}`, this.createOptions());
  }

  getPartidosEquipo(idEquipo: number): Observable<Partido[]> {
    return this.http.get<Partido[]>(`${environment.apiUrl}/partidos/equipo/${idEquipo}`, this.createOptions());
  }

  getUltimosPartidosPorLiga(): Observable<Partido[]> {
    return this.http.get<Partido[]>(`${environment.apiUrl}/partidos/ultimos`, this.createOptions());
  }

  getNumeroPartidos(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/partidos/numTodos`, this.createOptions());
  }
}
