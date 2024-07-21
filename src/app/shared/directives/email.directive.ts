import { Directive } from "@angular/core";
import { NG_VALIDATORS, Validator, ValidationErrors, AbstractControl } from "@angular/forms";
import { emailValidator } from '@app/shared/validators/custom-validators';

@Directive({
    selector: '[emailValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: EmailValidatorDirective,
        multi: true,
    }],
})
export class EmailValidatorDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        return emailValidator()(control);
    }
}
