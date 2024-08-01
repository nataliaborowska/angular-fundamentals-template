import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

export interface User {
    name: string;
    email: string;
    password: string;
    role: string;
}

interface UserResp {
    successful: boolean;
    result?: User | string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private httpClient: HttpClient) {}

    getUser(): Observable<User | string> {
        return this.httpClient.get<UserResp>(`${this.getLoginUrl()}/users/me`).pipe(
            map((resp: UserResp) => {
                if(resp.result !== undefined) {
                    return resp.result
                } else {
                    return 'user is undefined'
                }
            }),
            catchError((error: HttpErrorResponse) => {
                console.error('getUser failed: ', error);
                return throwError(error);
            })
        )
    }

    getLoginUrl() {
        return 'http://localhost:4000';
    }
}
