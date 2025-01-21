import { Injectable } from '@angular/core';
import { Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService {

  // Si el usuario ya está logueado, bloqueamos el acceso.
  canMatch(route: Route, state: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> {
    return this.token.loggedIn() ? true : of(this.router.parseUrl('/login')); // Redirige a login si está logueado
  }

  constructor(private token: TokenService, private router: Router) { }
}
