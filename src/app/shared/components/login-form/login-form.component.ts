import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  onSubmit() {
    this.submitted = true;

    if (this.loginForm) {
      this.loginForm.form.markAllAsTouched();
    }
  }
}
