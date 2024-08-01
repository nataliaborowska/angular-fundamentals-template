import { Component, OnInit } from '@angular/core';
import { UserStoreService } from './user/services/user-store.service';
import { Router } from '@angular/router';
import { AuthService } from '../app/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../app/user/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'courses-app';
  isLoggedIn = false;
  currentUserName: string = '';
  private subscriptions: Subscription = new Subscription();

  constructor(
    private userStoreService: UserStoreService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const authSub = this.authService.isAuthorized$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.userStoreService.getUser();
      } else {
        this.currentUserName = '';
      }
    });

    const nameSub = this.userStoreService.name$.subscribe(name => {
      this.currentUserName = name;
    });

    this.subscriptions.add(authSub);
    this.subscriptions.add(nameSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onButtonClick(): void {
    if(this.isLoggedIn) {
      this.authService.logout();
    } else {
      this.router.navigate(['/login']);
    } 
  }

  get buttonText(): string {
    return this.isLoggedIn ? 'Logout' : 'Login';
  }
}
