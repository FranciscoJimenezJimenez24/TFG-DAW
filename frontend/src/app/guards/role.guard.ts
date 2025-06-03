import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const allowedRoles = route.data['roles'] as Array<string>;
        const userRole = localStorage.getItem('rol');

        if (userRole && allowedRoles.includes(userRole)) {
            return true;
        }

        this.router.navigate(['/']);
        return false;
    }
}
