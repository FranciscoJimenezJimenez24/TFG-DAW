import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { RouterStateSnapshot, Route, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeforeLoginService {
  // Usamos canMatch en lugar de CanActivate
  canMatch(route: Route, state: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> {
    return !this.token.loggedIn();
  }

  constructor(private token: TokenService) { }
}
