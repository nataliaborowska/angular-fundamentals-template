import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;
  submitted: boolean;

  constructor(private authService: AuthService) {
    this.registrationForm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.submitted = false;
  }

  get name() {
    return this.registrationForm.get('name');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  isSubmitBtnDisabled(): boolean {
    const isTitleInvalid = this.name?.invalid ?? true;
    const isDescriptionInvalid = this.email?.invalid ?? true;
    const isDurationInvalid = this.password?.invalid ?? true;
    return isTitleInvalid || isDescriptionInvalid || isDurationInvalid;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registrationForm.valid) {
      this.authService.register(this.registrationForm.value);
    } else {
      if (this.registrationForm) {
        this.registrationForm.markAllAsTouched();
      }
    }
  }
}