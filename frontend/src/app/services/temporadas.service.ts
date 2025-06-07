import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Temporada } from '../interfaces/temporada';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemporadasService {

  constructor(private http:HttpClient) { }

  getTemporada(id:number):Observable<Temporada>{
    return this.http.get<Temporada>(`${environment.apiUrl}/temporadas/${id}`);
  }

  getTemporadas():Observable<Temporada[]>{
    return this.http.get<Temporada[]>(`${environment.apiUrl}/temporadas`);
  }
}
