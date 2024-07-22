import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { emailValidator } from '@app/shared/validators/custom-validators';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;
  submitted: boolean;

  constructor() {
    this.registrationForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
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

    if (this.registrationForm) {
      this.registrationForm.markAllAsTouched();
    }
  }
}
