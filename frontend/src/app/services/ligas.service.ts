import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Liga } from '../interfaces/liga';

@Injectable({
  providedIn: 'root'
})
export class LigasService {

  constructor(private http: HttpClient) { }

  getLigas():Observable<Liga[]> {
    return this.http.get<Liga[]>('http://127.0.0.1:8000/api/ligas');
  }

  getLiga(id: number):Observable<Liga> {
    return this.http.get<Liga>(`http://127.0.0.1:8000/api/ligas/${id}`);
  }
}
