import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanLoad, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlSegment, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AuthorizedGuard implements CanLoad, CanActivate, CanActivateChild {
    constructor(private authService: AuthService, private router: Router) {}

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean>|Promise<boolean>|boolean {
        return this.checkAuthorization();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        return this.checkAuthorization();
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        return this.checkAuthorization();
    }

    private checkAuthorization(): Observable<boolean> {
        return this.authService.isAuthorized$.pipe(
            take(1),
            map(isAuthorized => {
                if (!isAuthorized) {
                    this.router.navigate(['/login']);
                    return false;
                }
                return true;
            })
        );
    }
}
