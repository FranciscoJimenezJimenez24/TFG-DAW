import { Injectable } from '@angular/core';
import { Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService {
  canMatch(route: Route, state: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> {
    if (this.token.loggedIn()) {
      console.log('Usuario logueado, redirigiendo al home');
      return of(this.router.parseUrl('/')); // ✅ Redirigir a home en vez de login
    }
    return true; // ✅ Permitir acceso si NO está logueado
  }

  constructor(private token: TokenService, private router: Router) {}
}
