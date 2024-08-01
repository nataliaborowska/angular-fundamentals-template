import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { SessionStorageService } from "./session-storage.service";
import { catchError, tap } from 'rxjs/operators';

interface LoginResponse {
    successful: boolean;
    result: string;
    user: {
        email: string;
        name: string;
    }
}

interface RegisterResponse {
    successful: boolean;
    result: string;
}

interface User {
    email: string;
    password: string;
    name?: string;
}


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthorized$$ = new BehaviorSubject<boolean>(false);
    isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

    constructor(private httpClient: HttpClient, private sessionStorage: SessionStorageService) {
        const token = this.sessionStorage.getToken();

        if(token) {
            this.isAuthorized$$.next(true);
        }
    }

    login(user: User): Observable<LoginResponse> {
        return this.httpClient.post<LoginResponse>(`${this.getLoginUrl()}/login`, user).pipe(
            tap((data: LoginResponse) => {
                if (data.successful) {
                    this.sessionStorage.setToken(data.result);
                    this.isAuthorized$$.next(true);
                } else {
                    this.isAuthorized$$.next(false);
                }
            }),
            catchError((err: HttpErrorResponse) => {
                console.log(`Error: ${err}`);
                this.isAuthorized$$.next(false);
                return throwError(err);
            })
        );
    }

    logout() {
        this.httpClient.delete(`${this.getLoginUrl()}/logout`)
        .subscribe(
            () => {
                this.sessionStorage.deleteToken();
                this.isAuthorised = false;
            },
            (err: HttpErrorResponse) => {
                console.log(`Error: ${err}`);
            }
        );
        
    }

    register(user: User) {
        this.httpClient.post<RegisterResponse>(`${this.getLoginUrl()}/register`, {
            ...user
        }).subscribe(
            (data: RegisterResponse) => {
                if(data.successful) {
                    this.login(user);
                } else {
                    console.log('There was a problem during registration')
                }
            },
            (err: HttpErrorResponse) => {
                console.log(`Error: ${err}`);
            }
        );
    }

    get isAuthorised() {
        return this.isAuthorized$$.getValue();
    }

    set isAuthorised(value: boolean) {
        this.isAuthorized$$.next(value);
    }

    getLoginUrl() {
        return 'http://localhost:4000';
    }
}
