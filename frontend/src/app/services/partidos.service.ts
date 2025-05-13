import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partido } from '../interfaces/partido';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  constructor(private http: HttpClient) { }

  getPartido(id: number): Observable<Partido> {
    return this.http.get<Partido>(`http://127.0.0.1:8000/api/partidos/${id}`);
  }

  getPartidosLigasTemporadas(idLiga:number,idTemporada:number):Observable<Partido[]>{
    return this.http.get<Partido[]>(`http://127.0.0.1:8000/api/partidos?liga_id=${idLiga}&temporada_id=${idTemporada}`);
  }

  getPartidosEquipo(idEquipo:number):Observable<Partido[]>{
    return this.http.get<Partido[]>(`http://127.0.0.1:8000/api/partidos/equipo/${idEquipo}`);
  }

  getUltimosPartidosPorLiga():Observable<Partido[]>{
    return this.http.get<Partido[]>(`http://127.0.0.1:8000/api/partidos/ultimos`);
  }

  getNumeroPartidos():Observable<number>{
    return this.http.get<number>(`http://127.0.0.1:8000/api/partidos/numTodos`);
  }
}
