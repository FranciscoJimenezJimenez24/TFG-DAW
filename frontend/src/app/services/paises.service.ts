import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../interfaces/pais';
import { environment } from 'environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {}

  private createOptions(): { headers: HttpHeaders } {
    return { headers: this.headers };
  }

  getPais(id: number): Observable<Pais> {
    return this.http.get<Pais>(`${environment.apiUrl}/paises/${id}`, this.createOptions());
  }
}
