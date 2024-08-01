import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { SessionStorageService } from '../services/session-storage.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private sessionStorage: SessionStorageService, private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.sessionStorage.getToken();
        let authReq = req;

        if (token) {
            authReq = req.clone({
                headers: req.headers.set('Authorization', token)
            });
        }
        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if(error.status === 401) {
                    this.router.navigate(['/login'])
                }
                return throwError(error);
            })
        )
      
    }
}
