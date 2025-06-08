import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../interfaces/pais';
import { environment } from 'environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(private http:HttpClient) { }

  getPais(id:number):Observable<Pais>{
    return this.http.get<Pais>(`${environment.apiUrl}/paises/${id}`);
  }
}
