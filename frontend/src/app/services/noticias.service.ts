import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticia } from '../interfaces/noticia';
import { environment } from 'environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {}

  private createOptions(): { headers: HttpHeaders } {
    return { headers: this.headers };
  }

  getNoticia(idNoticia: number): Observable<Noticia> {
    return this.http.get<Noticia>(`${environment.apiUrl}/noticias/${idNoticia}`, this.createOptions());
  }

  getNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(`${environment.apiUrl}/noticias`, this.createOptions());
  }

  addNoticia(noticia: Noticia): Observable<Noticia> {
    return this.http.post<Noticia>(`${environment.apiUrl}/noticias`, noticia, this.createOptions());
  }

  updateNoticia(noticia: Noticia): Observable<Noticia> {
    return this.http.put<Noticia>(`${environment.apiUrl}/noticias`, noticia, this.createOptions());
  }

  deleteNoticia(idNoticia: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/noticias/${idNoticia}`, this.createOptions());
  }

  getUltimasNoticas(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(`${environment.apiUrl}/noticias/ultimas`, this.createOptions());
  }

  getNoticiaByAutor(autor: string): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(`${environment.apiUrl}/noticias/autor/${autor}`, this.createOptions());
  }
}
