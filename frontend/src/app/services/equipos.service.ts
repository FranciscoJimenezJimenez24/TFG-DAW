import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipo } from '../interfaces/equipo';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  constructor(private http:HttpClient) { }

  getEquiposLigas(id:number):Observable<Equipo[]>{
    return this.http.get<Equipo[]>(`http://127.0.0.1:8000/api/equipos?liga_id=${id}`);
  }
}
