import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'  // El servicio BackendService es proporcionado a nivel raíz
})
export class BackendService {

  constructor(private http: HttpClient) {}

  signup(data: any) {
    return this.http.post(`${environment.apiUrl}/signup`, data);
  }
  login(data: any) {
    return this.http.post(`${environment.apiUrl}/login`, data);
  }
}
