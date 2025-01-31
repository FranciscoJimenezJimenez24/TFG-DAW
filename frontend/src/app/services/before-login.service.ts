import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Router, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeforeLoginService {
  constructor(private token: TokenService, private router: Router) {}

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean | UrlTree> {
    if (this.token.loggedIn()) {
      console.log('Usuario autenticado, redirigiendo...');
      return of(this.router.parseUrl('/login')); // Redirigir a login si está logueado
    }
    return true; // Permitir acceso si NO está logueado
  }
}
