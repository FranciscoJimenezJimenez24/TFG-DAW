import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipo } from '../interfaces/equipo';
import { environment } from 'environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  constructor(private http: HttpClient, private headers: HttpHeaders) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  private createOptions(): { headers: HttpHeaders } {
    return { headers: this.headers };
  }

  getEquipos(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${environment.apiUrl}/equipos`, this.createOptions());
  }

  getEquiposLigas(id: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${environment.apiUrl}/equipos/liga/${id}`, this.createOptions());
  }

  getEquipo(idEquipo: number): Observable<Equipo> {
    return this.http.get<Equipo>(`${environment.apiUrl}/equipos/${idEquipo}`, this.createOptions());
  }

  getNumeroEquipos(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/equipos/numTodos`, this.createOptions());
  }

  getEquipoByEscudo(escudo: string): Observable<Equipo> {
    // Primero, extraer solo el nombre del archivo si es una URL completa
    const escudoNombre = escudo.split('/').pop() || escudo;
    return this.http.get<Equipo>(`${environment.apiUrl}/equipos/escudo?escudo=${encodeURIComponent(escudoNombre)}`, this.createOptions());
  }
}
