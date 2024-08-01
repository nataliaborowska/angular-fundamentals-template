import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanLoad, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlSegment, Route, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AuthorizedGuard implements CanLoad, CanActivate, CanActivateChild {
    constructor(private authService: AuthService, private router: Router) {}

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.checkAuthorization();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.checkAuthorization();
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.checkAuthorization();
    }

    private checkAuthorization(): Observable<boolean | UrlTree> {
        return this.authService.isAuthorized$.pipe(
            take(1),
            map(isAuthorized => {
                if (!isAuthorized) {
                    return this.router.createUrlTree(['/login']);
                }
                return true;
            })
        );
    }
}
