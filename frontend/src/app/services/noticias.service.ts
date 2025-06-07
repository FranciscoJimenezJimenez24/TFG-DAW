import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticia } from '../interfaces/noticia';
import { environment } from '../../environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(
    private http: HttpClient
  ) { }

  getNoticia(idNoticia: number):Observable<Noticia>{
    return this.http.get<Noticia>(`${environment.apiUrl}/noticias/${idNoticia}`);
  }

  getNoticias():Observable<Noticia[]>{
    return this.http.get<Noticia[]>(`${environment.apiUrl}/noticias`);
  }

  addNoticia(noticia:Noticia):Observable<Noticia>{
    return this.http.post<Noticia>(`${environment.apiUrl}/noticias`,noticia);
  }

  updateNoticia(noticia:Noticia):Observable<Noticia>{
    return this.http.put<Noticia>(`${environment.apiUrl}/noticias`,noticia);
  }

  deleteNoticia(idNoticia:number):Observable<void>{
    return this.http.delete<void>(`${environment.apiUrl}/noticias/${idNoticia}`)
  }

  getUltimasNoticas():Observable<Noticia[]>{
    return this.http.get<Noticia[]>(`${environment.apiUrl}/noticias/ultimas`);
  }
}
