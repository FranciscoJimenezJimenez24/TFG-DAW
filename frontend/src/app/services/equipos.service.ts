import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipo } from '../interfaces/equipo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  constructor(private http: HttpClient) { }

  getEquipos(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${environment.apiUrl}/equipos`);
  }

  getEquiposLigas(id: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${environment.apiUrl}/equipos/liga/${id}`);
  }

  getEquipo(idEquipo: number): Observable<Equipo> {
    return this.http.get<Equipo>(`${environment.apiUrl}/equipos/${idEquipo}`);
  }

  getNumeroEquipos(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/equipos/numTodos`);
  }

  getEquipoByEscudo(escudo: string): Observable<Equipo> {
    // Primero, extraer solo el nombre del archivo si es una URL completa
    const escudoNombre = escudo.split('/').pop() || escudo;
    return this.http.get<Equipo>(`${environment.apiUrl}/equipos/escudo?escudo=${encodeURIComponent(escudoNombre)}`);
  }
}
