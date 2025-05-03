import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Temporada } from '../interfaces/temporada';

@Injectable({
  providedIn: 'root'
})
export class TemporadasService {

  constructor(private http:HttpClient) { }

  getTemporada(id:number):Observable<Temporada>{
    return this.http.get<Temporada>(`http://127.0.0.1:8000/api/temporadas/${id}`);
  }

  getTemporadas():Observable<Temporada[]>{
    return this.http.get<Temporada[]>('http://127.0.0.1:8000/api/temporadas');
  }
}
