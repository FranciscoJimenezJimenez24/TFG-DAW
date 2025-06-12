import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginGuard implements CanActivate {

  constructor(private token: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.token.loggedIn()) {
      localStorage.clear();
      this.router.navigate(['/login']);
      return false;
    }

    const allowedRoles = route.data['allowedRoles'] as Array<string>;
    const userRole = localStorage.getItem('rol') !!;

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}