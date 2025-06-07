import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Liga } from '../interfaces/liga';
import { environment } from '../../environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class LigasService {

  constructor(private http: HttpClient) { }

  getLigas():Observable<Liga[]> {
    return this.http.get<Liga[]>(`${environment.apiUrl}/ligas`);
  }

  getLiga(id: number):Observable<Liga> {
    return this.http.get<Liga>(`${environment.apiUrl}/ligas/${id}`);
  }
}
