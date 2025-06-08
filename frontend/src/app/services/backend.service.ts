import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environments.prod';

@Injectable({
  providedIn: 'root'  // El servicio BackendService es proporcionado a nivel raíz
})
export class BackendService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {}

  private createOptions(): { headers: HttpHeaders } {
    return { headers: this.headers };
  }

  signup(data: any) {
    return this.http.post(`${environment.apiUrl}/signup`, data, this.createOptions());
  }
  login(data: any) {
    return this.http.post(`${environment.apiUrl}/login`, data, this.createOptions());
  }
}
