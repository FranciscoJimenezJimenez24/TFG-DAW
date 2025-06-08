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

  getUsuarios():Observable<Usuario[]>{
    const token = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario[]>(`${environment.apiUrl}/usuarios`, { headers });
  }

  getUsuario(): Observable<Usuario> {
    const token = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario>(`${environment.apiUrl}/me`, { headers });
  }

  getUsuarioByEmail(email:string):Observable<Usuario>{
    const token = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);    
    return this.http.get<Usuario>(`${environment.apiUrl}/usuarios/${email}`, { headers });
  }

  addUsuario(usuario:Usuario):Observable<Usuario>{
    const token = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Usuario>(`${environment.apiUrl}/usuarios`, usuario, { headers });
  }

  updateUsuario(usuario:Usuario):Observable<Usuario>{
    const token = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Usuario>(`${environment.apiUrl}/usuarios`, usuario, { headers });
  }

  deleteUsuario(idUsuario:number):Observable<void>{
    const token = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${environment.apiUrl}/usuarios/${idUsuario}`, { headers });
  }

}
