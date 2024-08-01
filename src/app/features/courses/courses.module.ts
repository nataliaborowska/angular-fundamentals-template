import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoursesComponent } from './courses.component';
import { CoursesRouting } from './courses.routing';
import { SharedModule } from '@shared/shared.module';
import { CoursesListComponent } from '../courses-list/courses-list.component';
import { AuthorizedGuard } from '../../auth/guards/authorized.guard';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        CoursesRouting,
        SharedModule,
    ],
    declarations: [
        CoursesComponent,
        CoursesListComponent,
    ],
    providers: [AuthorizedGuard]
})
export class CoursesModule {

}