import { Injectable } from '@angular/core';
import { UserService, User } from './user.service';
import { BehaviorSubject, Observable } from 'rxjs';

const ADMIN_DATA = {
    email: 'admin@email.com',
    password: 'admin123',
}

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {
    private name$$ = new BehaviorSubject<string>('');
    private isAdmin$$ = new BehaviorSubject<boolean>(false);
    name$: Observable<string> = this.name$$.asObservable();
    isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

    constructor(private userService: UserService) {};

    getUser() {
        this.userService.getUser()
            .subscribe({
            next: (result: User | string) => {
                if (typeof result === 'string') {
                    console.error('Error fetching user: ', result);
                    this.name$$.next('');
                    this.isAdmin$$.next(false);
                } else {
                    this.name$$.next(result.name);
                    if (result.email === ADMIN_DATA.email && result.password === ADMIN_DATA.password) {
                        this.isAdmin$$.next(true);
                    } else {
                        this.isAdmin$$.next(false);
                    }
                }
            },
            error: (error) => {
                console.error('Error fetching user: ', error);
                this.isAdmin$$.next(false);
            }
        })
    }

    get isAdmin(): boolean {
        return this.isAdmin$$.getValue();
    }

    set isAdmin(value: boolean) {
        if (this.name$$.getValue()) {
            this.isAdmin$$.next(value);
        }
    }
}
