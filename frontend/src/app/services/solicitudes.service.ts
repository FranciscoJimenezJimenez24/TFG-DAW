import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Solicitud } from '../interfaces/solicitud';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(private http:HttpClient) { }

  getSolicitudes():Observable<Solicitud[]>{
    return this.http.get<Solicitud[]>(`${environment.apiUrl}/solicitudes`);
  }

  agregarSolicitud(solicitud:Solicitud):Observable<Solicitud>{
    return this.http.post<Solicitud>(`${environment.apiUrl}/solicitudes`,solicitud);
  }

  deleteSolicitud(idSolicitud:number):Observable<void>{
    return this.http.delete<void>(`${environment.apiUrl}/solicitudes/`+idSolicitud);
  }
}
