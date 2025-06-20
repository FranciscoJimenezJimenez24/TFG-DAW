import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Temporada } from '../interfaces/temporada';
import { environment } from 'environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class TemporadasService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {}

  private createOptions(): { headers: HttpHeaders } {
    return { headers: this.headers };
  }

  getTemporada(id: number): Observable<Temporada> {
    return this.http.get<Temporada>(`${environment.apiUrl}/temporadas/${id}`, this.createOptions());
  }

  getTemporadas(): Observable<Temporada[]> {
    return this.http.get<Temporada[]>(`${environment.apiUrl}/temporadas`, this.createOptions());
  }
}
