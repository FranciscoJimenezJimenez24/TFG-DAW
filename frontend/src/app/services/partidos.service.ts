import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partido } from '../interfaces/partido';
import { environment } from 'environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  constructor(private http: HttpClient) { }

  getPartido(id: number): Observable<Partido> {
    return this.http.get<Partido>(`${environment.apiUrl}/partidos/${id}`);
  }

  getPartidosLigasTemporadas(idLiga:number,idTemporada:number):Observable<Partido[]>{
    return this.http.get<Partido[]>(`${environment.apiUrl}/partidos?liga_id=${idLiga}&temporada_id=${idTemporada}`);
  }

  getPartidosEquipo(idEquipo:number):Observable<Partido[]>{
    return this.http.get<Partido[]>(`${environment.apiUrl}/partidos/equipo/${idEquipo}`);
  }

  getUltimosPartidosPorLiga():Observable<Partido[]>{
    return this.http.get<Partido[]>(`${environment.apiUrl}/partidos/ultimos`);
  }

  getNumeroPartidos():Observable<number>{
    return this.http.get<number>(`${environment.apiUrl}/partidos/numTodos`);
  }
}
