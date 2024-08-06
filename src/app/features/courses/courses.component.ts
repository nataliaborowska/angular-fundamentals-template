import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { Course } from '../../services/courses.service';
import { Router } from '@angular/router';
import { UserStoreService } from '@app/user/services/user-store.service';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses$!: Observable<Course[]>;
  isLoading$!: Observable<boolean>;
  isAuthorized: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userStoreService: UserStoreService,
    private coursesStoreService: CoursesStateFacade,
  ) {}

  ngOnInit(): void {
    this.coursesStoreService.getAllCourses();
    this.courses$ = this.coursesStoreService.allCourses$;
    this.isLoading$ = this.coursesStoreService.isAllCoursesLoading$;
    this.authService.isAuthorized$.subscribe(isAuthorized => {
      this.isAuthorized = isAuthorized;
    });
    this.userStoreService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  onShowCourse(course: Course): void {
    this.router.navigate([`/courses/${course.id}`]);
  }

  onAddCourse(): void {
    this.router.navigate(['/courses/add']);
  }

  onEditCourse(course: Course): void {
    this.router.navigate(['/courses/edit', course.id]);
  }

  onDeleteCourse(course: Course): void {
    if (course.id) {
      this.coursesStoreService.deleteCourse(course.id);
    }
  }

  onSearch(searchTerm: string): void {
    this.coursesStoreService.getFilteredCourses(searchTerm);
  }
}