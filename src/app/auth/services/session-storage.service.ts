import { Inject, Injectable, InjectionToken } from '@angular/core';
// import { WINDOW } from './window.token';

const TOKEN = 'SESSION_TOKEN';

// export const WINDOW = new InjectionToken<Window>('Window');

export const WINDOW = new InjectionToken<Window>('Window', {
  providedIn: 'root',
  factory: () => window
});

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  constructor(@Inject(WINDOW) private window: Window) {}

  setToken(token: string): void {
    this.window.sessionStorage.setItem(TOKEN, token)
  }

  getToken(): string | null {
    return this.window.sessionStorage.getItem(TOKEN);
  }

  deleteToken(): void {
    this.window.sessionStorage.removeItem(TOKEN);
  }
}
