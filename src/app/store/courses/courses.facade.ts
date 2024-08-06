import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../index';
import { Observable } from 'rxjs';
import * as CoursesSelectors from './courses.selectors';
import * as CoursesActions from './courses.actions';
import { Course } from '@app/services/courses.service';

@Injectable({
    providedIn: 'root'
})
export class CoursesStateFacade {
    constructor(private store: Store<State>) {}
  
    isAllCoursesLoading$: Observable<boolean> = this.store.pipe(select(CoursesSelectors.isAllCoursesLoadingSelector));
    isSingleCourseLoading$: Observable<boolean> = this.store.pipe(select(CoursesSelectors.isSingleCourseLoadingSelector));
    isSearchingState$: Observable<boolean> = this.store.pipe(select(CoursesSelectors.isSearchingStateSelector));
    courses$: Observable<Course[]> = this.store.pipe(select(CoursesSelectors.getCourses));
    allCourses$: Observable<Course[]> = this.store.pipe(select(CoursesSelectors.getAllCourses));
    course$: Observable<Course | null> = this.store.pipe(select(CoursesSelectors.getCourse));
    errorMessage$: Observable<string> = this.store.pipe(select(CoursesSelectors.getErrorMessage));
    
    getAllCourses(): void {
        this.store.dispatch(CoursesActions.requestAllCourses());
    } 
    getSingleCourse(id: string): void {
        this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
    } 
    getFilteredCourses(searchValue: string): void {
        this.store.dispatch(CoursesActions.requestFilteredCourses({ title: searchValue }));
    }
    editCourse(body: Course, id: string): void {
        this.store.dispatch(CoursesActions.requestEditCourse({ id, course: body }));
    }
    createCourse(body: Course): void {
        this.store.dispatch(CoursesActions.requestCreateCourse({ course: body }));
    }
    deleteCourse(id: string): void {
        this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
    }
}
