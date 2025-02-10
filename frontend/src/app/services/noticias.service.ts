import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticia } from '../interfaces/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(
    private http: HttpClient
  ) { }

  getNoticias():Observable<Noticia[]>{
    return this.http.get<Noticia[]>('http://127.0.0.1:8000/api/noticias');
  }

  addNoticia(noticia:Noticia):Observable<Noticia>{
    return this.http.post<Noticia>('http://127.0.0.1:8000/api/noticias',noticia);
  }
}
