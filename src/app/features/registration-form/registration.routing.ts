import { Routes, RouterModule } from '@angular/router';
import { RegistrationFormComponent } from './registration-form.component';

const registrationRoutes: Routes = [
    { path: '', component: RegistrationFormComponent }
];

export const RegistrationRouting = RouterModule.forChild(registrationRoutes)
