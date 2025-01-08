import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // El servicio BackendService es proporcionado a nivel raíz
})
export class BackendService {

  constructor(private http: HttpClient) {}

  signup(data: any) {
    return this.http.post('http://127.0.0.1:8000/api/signup', data);
  }
  login(data: any) {
    return this.http.post('http://127.0.0.1:8000/api/login', data);
  }
}
