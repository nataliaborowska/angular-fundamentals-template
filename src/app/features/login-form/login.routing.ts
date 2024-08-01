import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form.component';

const loginRoutes: Routes = [
    { path: '', component: LoginFormComponent }
];

export const LoginRouting = RouterModule.forChild(loginRoutes)
