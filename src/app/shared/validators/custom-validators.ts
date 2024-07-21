import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
    const emailRegExp = new RegExp('^[\\w.%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$');
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value === '') {
            return null;
        }
        const isCorrectEmail = emailRegExp.test(control.value);
        return isCorrectEmail ? null : { invalidEmail: { value: control.value } }
    }
}

export function lattinLettersAndNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const regex = /^[a-zA-Z0-9]*$/;
        const isValid = regex.test(control.value);

        return isValid ? null : { invalidCharacters: true };
    }
}