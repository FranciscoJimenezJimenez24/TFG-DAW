import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Liga } from '../interfaces/liga';
import { environment } from 'environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class LigasService {

  constructor(private http: HttpClient, private headers: HttpHeaders) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  private createOptions(): { headers: HttpHeaders } {
    return { headers: this.headers };
  }

  getLigas(): Observable<Liga[]> {
    return this.http.get<Liga[]>(`${environment.apiUrl}/ligas`, this.createOptions());
  }

  getLiga(id: number): Observable<Liga> {
    return this.http.get<Liga>(`${environment.apiUrl}/ligas/${id}`, this.createOptions());
  }
}
