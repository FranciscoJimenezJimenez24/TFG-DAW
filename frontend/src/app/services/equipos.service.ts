import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipo } from '../interfaces/equipo';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  constructor(private http:HttpClient) { }

  getEquipos():Observable<Equipo[]>{
    return this.http.get<Equipo[]>(`http://127.0.0.1:8000/api/equipos`);
  }

  getEquiposLigas(id:number):Observable<Equipo[]>{
    return this.http.get<Equipo[]>(`http://127.0.0.1:8000/api/equipos/liga/${id}`);
  }

  getEquipo(idEquipo:number):Observable<Equipo>{
    return this.http.get<Equipo>(`http://127.0.0.1:8000/api/equipos/${idEquipo}`);
  }

  getNumeroEquipos():Observable<number>{
    return this.http.get<number>(`http://127.0.0.1:8000/api/equipos/numTodos`);
  }
}
