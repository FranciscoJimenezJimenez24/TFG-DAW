import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Solicitud } from '../interfaces/solicitud';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(private http:HttpClient) { }

  getSolicitudes():Observable<Solicitud[]>{
    return this.http.get<Solicitud[]>('http://127.0.0.1:8000/api/solicitudes');
  }

  agregarSolicitud(solicitud:Solicitud):Observable<Solicitud>{
    return this.http.post<Solicitud>('http://127.0.0.1:8000/api/solicitudes',solicitud);
  }

  deleteSolicitud(idSolicitud:number):Observable<void>{
    return this.http.delete<void>('http://127.0.0.1:8000/api/solicitudes/'+idSolicitud);
  }
}
