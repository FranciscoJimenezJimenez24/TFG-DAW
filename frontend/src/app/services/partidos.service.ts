import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partido } from '../interfaces/partido';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  constructor(private http: HttpClient) { }

  getPartidosLigasTemporadas(idLiga:number,idTemporada:number):Observable<Partido[]>{
    return this.http.get<Partido[]>(`http://127.0.0.1:8000/api/partidos?liga_id=${idLiga}&temporada_id=${idTemporada}`);
  }

  getPartidosEquipo(idEquipo:number):Observable<Partido[]>{
    return this.http.get<Partido[]>(`http://127.0.0.1:8000/api/partidos/equipo/${idEquipo}`);
  }

}
