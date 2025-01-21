import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  loggedIn(): boolean {
    return this.isValid();
  }

  handle(token: any): void {
    this.set(token);
  }

  set(token: any): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('token', token);
    } else {
      console.warn('localStorage no está disponible.');
    }
  }

  get(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('token');
    }
    console.warn('localStorage no está disponible.');
    return null;
  }

  remove(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('token');
    } else {
      console.warn('localStorage no está disponible.');
    }
  }

  isValid(): boolean {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return payload.iss === 'http://127.0.0.1:8000/api/login';
      }
    }
    return false;
  }

  payload(token: string): any {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload: string): any {
    return JSON.parse(atob(payload));
  }
}
