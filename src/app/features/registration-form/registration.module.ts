import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegistrationFormComponent } from './registration-form.component';
import { RegistrationRouting } from './registration.routing';
import { SharedModule } from '@shared/shared.module';  

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RegistrationRouting,
        SharedModule,
    ],
    declarations: [
        RegistrationFormComponent,
    ],
})
export class RegistrationModule {

}