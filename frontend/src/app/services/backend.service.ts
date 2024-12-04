import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http:HttpClient) { }

  signup(data:any){
    return this.http.post('url',data);
  }
}
