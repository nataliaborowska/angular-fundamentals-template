import { Injectable } from '@angular/core';
import { UserStoreService } from '../services/user-store.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

interface CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
}

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private userStoreService: UserStoreService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.userStoreService.isAdmin$.pipe(
            take(1),
            map(isAdmin => {
                if(isAdmin) {
                    return true;
                } else {
                    return this.router.createUrlTree(['/courses']);
                }
            })
        )
    }
}
