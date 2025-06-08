import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Solicitud } from '../interfaces/solicitud';
import { Observable } from 'rxjs';
import { environment } from 'environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {}

  private createOptions(): { headers: HttpHeaders } {
    return { headers: this.headers };
  }

  getSolicitudes(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${environment.apiUrl}/solicitudes`, this.createOptions());
  }

  agregarSolicitud(solicitud: Solicitud): Observable<Solicitud> {
    return this.http.post<Solicitud>(`${environment.apiUrl}/solicitudes`, solicitud, this.createOptions());
  }

  deleteSolicitud(idSolicitud: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/solicitudes/` + idSolicitud, this.createOptions());
  }
}
