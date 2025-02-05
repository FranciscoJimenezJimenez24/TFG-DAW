import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Goleador } from '../interfaces/goleador';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  constructor(private http: HttpClient) { }

  getMaximosGoleadoresTemporadaLiga(idLiga:number,idTemporada:number):Observable<Goleador>{
    return this.http.get<Goleador>(`http://127.0.0.1:8000/api/jugadores?liga_id=${idLiga}&temporada_id=${idTemporada}`);
  }
}
