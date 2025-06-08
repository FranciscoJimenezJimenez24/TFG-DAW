import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { environment } from 'environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  private createOptions(): { headers: HttpHeaders } {
    const token = this.tokenService.get();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return { headers };
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.apiUrl}/usuarios`, this.createOptions());
  }

  getUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.apiUrl}/me`, this.createOptions());
  }

  getUsuarioByEmail(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.apiUrl}/usuarios/${email}`, this.createOptions());
  }

  addUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.apiUrl}/usuarios`, usuario, this.createOptions());
  }

  updateUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${environment.apiUrl}/usuarios`, usuario, this.createOptions());
  }

  deleteUsuario(idUsuario: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/usuarios/${idUsuario}`, this.createOptions());
  }

}
