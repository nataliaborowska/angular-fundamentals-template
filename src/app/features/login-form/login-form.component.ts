import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild('loginForm') public loginForm!: NgForm;
  model = {
    email: '',
    password: '',
  }

  submitted: boolean = false;

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.authService.login(this.model).subscribe({
        next: (result) => {
          console.log('Login successful:', result);
        },
        error: (error) => {
          console.error('Login error:', error);
        }
      });
    } else {
      if (this.loginForm) {
        this.loginForm.form.markAllAsTouched();
      }
    }
  }
}
