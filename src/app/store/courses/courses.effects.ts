import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Course, CoursesService } from '@app/services/courses.service';
import * as CoursesActions from './courses.actions';
import { map, mergeMap, catchError, tap, withLatestFrom } from 'rxjs/operators';
import { CoursesConstants } from './courses.constants';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { CoursesStateFacade } from './courses.facade';

@Injectable()
export class CoursesEffects {
    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private router: Router,
        private coursesStateFascade: CoursesStateFacade,
    ) {}

    // Add your code here

    getAll$ = createEffect(() => 
        this.actions$.pipe(
            ofType(CoursesActions.requestAllCourses),
            mergeMap(() =>
                this.coursesService.getAll().pipe(
                    map(courses => {
                        if(Array.isArray(courses)) {
                            return CoursesActions.requestAllCoursesSuccess({ courses });
                        }

                        return CoursesActions.requestAllCoursesFail({ error: courses });
                    }),
                    catchError((error) => of(CoursesActions.requestAllCoursesFail({ error })))
                )
            )
        )
    );

    getSpecificCourse$ = createEffect(() => 
        this.actions$.pipe(
            ofType(CoursesActions.requestSingleCourse),
            mergeMap(action =>
                this.coursesService.getCourse(action.id).pipe(
                    map(course => {
                        if(typeof course !== 'string') {
                            return CoursesActions.requestSingleCourseSuccess({ course });
                        }

                        return CoursesActions.requestSingleCourseFail({ error: course });
                    }),
                    catchError((error) => of(CoursesActions.requestSingleCourseFail({ error })))
                )
            )
        )
    );

    deleteCourse$ = createEffect(() => 
        this.actions$.pipe(
            ofType(CoursesActions.requestDeleteCourse),
            mergeMap(action =>
                this.coursesService.deleteCourse(action.id).pipe(
                    map(() => {
                        return CoursesActions.requestDeleteCourseSuccess({ id: action.id });
                    }),
                    catchError((error) => of(CoursesActions.requestDeleteCourseFail({ error })))
                )
            )
        )
    );

    editCourse$ = createEffect(() => 
        this.actions$.pipe(
            ofType(CoursesActions.requestEditCourse),
            mergeMap(action =>
                this.coursesService.editCourse(action.id, action.course).pipe(
                    map(course => {
                        if(typeof course !== 'string') {
                            return CoursesActions.requestEditCourseSuccess({ course });
                        }

                        return CoursesActions.requestEditCourseFail({ error: course });
                    }),
                    catchError((error) => of(CoursesActions.requestEditCourseFail({ error })))
                )
            )
        )
    );

    createCourse$ = createEffect(() => 
        this.actions$.pipe(
            ofType(CoursesActions.requestCreateCourse),
            mergeMap(action =>
                this.coursesService.createCourse(action.course).pipe(
                    map(course => {
                        if(typeof course !== 'string') {
                            return CoursesActions.requestCreateCourseSuccess({ course });
                        }

                        return CoursesActions.requestCreateCourseFail({ error: course });
                    }),
                    catchError((error) => of(CoursesActions.requestCreateCourseFail({ error })))
                )
            )
        )
    );

    redirectToTheCoursesPage$ = createEffect(() => 
        this.actions$.pipe(
            ofType(
                CoursesActions.requestCreateCourseSuccess,
                CoursesActions.requestEditCourseSuccess,
                CoursesActions.requestSingleCourseFail
            ),
            tap(() => this.router.navigate(['/courses']))
        ),
        { dispatch: false }
    );

    filteredCourses$ = createEffect(() => 
        this.actions$.pipe(
            ofType(CoursesActions.requestFilteredCourses),
            withLatestFrom(this.coursesStateFascade.allCourses$),
            map(([action, allCourses]) => {
                const filteredCourses = allCourses.filter((course: Course) =>
                    course.title.toLowerCase().includes(action.title.toLowerCase()))

                return CoursesActions.requestFilteredCoursesSuccess({ courses: filteredCourses })
            }),
            catchError((error) => of(CoursesActions.requestAllCoursesFail({ error })))
        )
    );
}
