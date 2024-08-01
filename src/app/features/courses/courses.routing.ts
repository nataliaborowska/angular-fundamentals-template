import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseFormComponent } from '../../shared/components';
import { CourseInfoComponent } from '../../features/course-info/course-info.component';
import { AuthorizedGuard } from '../../auth/guards/authorized.guard';
import { AdminGuard } from '../../user/guards/admin.guard';

const coursesRoutes: Routes = [
    {
        path: '',
        component: CoursesComponent,
    },
    {
        path: 'add',
        component: CourseFormComponent,
        canActivate: [AuthorizedGuard]
    },
    { path: 'add', component: CourseFormComponent, canActivate: [AdminGuard] },
    { path: 'edit/:id', component: CourseFormComponent, canActivate: [AdminGuard] },
    {
        path: ':id',
        component: CourseInfoComponent,
        canActivate: [AuthorizedGuard]
    },
];

export const CoursesRouting = RouterModule.forChild(coursesRoutes);
