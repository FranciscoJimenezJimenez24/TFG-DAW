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

  getUsuarios():Observable<Usuario[]>{
    const token = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario[]>("http://127.0.0.1:8000/api/usuarios", { headers });
  }

  getUsuario(): Observable<Usuario> {
    const token = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario>("http://127.0.0.1:8000/api/me", { headers });
  }

  getUsuarioByEmail(email:string):Observable<Usuario>{
    const token = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(email);
    
    return this.http.get<Usuario>(`http://127.0.0.1:8000/api/usuarios/${email}`, { headers });
  }

  addUsuario(usuario:Usuario):Observable<Usuario>{
    const token = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Usuario>("http://127.0.0.1:8000/api/usuarios", usuario, { headers });
  }

  updateUsuario(usuario:Usuario):Observable<Usuario>{
    const token = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Usuario>("http://127.0.0.1:8000/api/usuarios", usuario, { headers });
  }

  deleteUsuario(idUsuario:number):Observable<void>{
    const token = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`http://127.0.0.1:8000/api/usuarios/${idUsuario}`, { headers });
  }

}
