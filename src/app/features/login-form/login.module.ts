import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form.component';
import { LoginRouting } from './login.routing';
import { SharedModule } from '@shared/shared.module';  

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        LoginRouting,
        SharedModule,
    ],
    declarations: [
        LoginFormComponent,
    ],
})
export class LoginModule {

}