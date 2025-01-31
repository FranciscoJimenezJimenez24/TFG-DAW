import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LigasService {

  constructor(private http: HttpClient) { }

  getLigas() {
    return this.http.post('http://127.0.0.1:8000/api/ligas', {});
  }
}
