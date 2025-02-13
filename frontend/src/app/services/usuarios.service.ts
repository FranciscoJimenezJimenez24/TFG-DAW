import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getUsuario(): Observable<Usuario> {
    const token = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario>("http://127.0.0.1:8000/api/me", { headers });
  }

  getUsuarioByEmail(email:string):Observable<Usuario>{
    const token = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario>(`http://127.0.0.1:8000/api/usuarios/${email}`, { headers });
  }

  updateUsuario(usuario:Usuario):Observable<Usuario>{
    const token = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Usuario>("http://127.0.0.1:8000/api/usuarios", usuario, { headers });
  }

}
