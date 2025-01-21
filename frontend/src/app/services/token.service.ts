import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  handle(token:any){
    this.set(token);
  }
  set(token:any){
    return localStorage.setItem('token',token);
  }
  get(){
    return localStorage.getItem('token');
  }
}
