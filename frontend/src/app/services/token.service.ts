import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ServerStorage } from '../classes/serverStorage';
import { environment } from 'environments/environments.prod';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private storage: Storage;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    try {
      if (isPlatformBrowser(this.platformId)) {
        this.storage = localStorage;
      } else {
        this.storage = new ServerStorage();
      }
    } catch (error) {
      this.storage = new ServerStorage(); // Evita que la app se rompa
    }
  }

  loggedIn(): boolean {
    return this.isValid() && !this.isExpired();
  }

  handle(token: any): void {
    this.set(token);
  }

  set(token: any): void {
    this.storage.setItem('token', token);
  }

  get(): string | null {
    const token = this.storage.getItem('token');
    return token;
  }

  remove(): void {
    this.storage.removeItem('token');
  }

  isValid(): boolean {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return payload.iss === `${environment.apiUrl}/login`;
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

  getTokenExpiration(): number | null {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload && payload.exp) {
        return payload.exp * 1000; // exp viene en segundos desde epoch
      }
    }
    return null;
  }

  isExpired(): boolean {
    const expiration = this.getTokenExpiration();
    if (expiration) {
      return Date.now() > expiration;
    }
    return true;
  }

}