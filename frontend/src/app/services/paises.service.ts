import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../interfaces/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(private http:HttpClient) { }

  getPais(id:number):Observable<Pais>{
    return this.http.get<Pais>(`http://127.0.0.1:8000/api/paises/${id}`);
  }
}
