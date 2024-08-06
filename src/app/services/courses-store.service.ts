import { Injectable } from '@angular/core';
import { CoursesService, Course, Author } from './courses.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {
    private isLoading$$ = new BehaviorSubject<boolean>(false);
    private courses$$ = new BehaviorSubject<Course[]>([]);
    private authors$$ = new BehaviorSubject<Author[]>([]);
    isLoading$: Observable<boolean> = this.isLoading$$.asObservable();
    courses$: Observable<Course[]> = this.courses$$.asObservable();
    authors$: Observable<Author[]> = this.authors$$.asObservable();

    constructor(private coursesService: CoursesService, private router: Router) {};

    getAll(){
        this.isLoading$$.next(true);
        this.coursesService.getAll().pipe(
            finalize(() => this.isLoading$$.next(false))
        ).subscribe({
            next: (result: Course[]| string) => {
                if(Array.isArray(result)) {
                    this.courses$$.next(result)
                } else {
                    console.error('Error fetching all courses: ', result)
                    this.courses$$.next([]);
                }
            },
            error: (error) => {
                console.error('Error fetching all courses: ', error)
                this.courses$$.next([]);
            }
        })
    }

    createCourse(course: Course) {
        this.isLoading$$.next(true);
        this.coursesService.createCourse(course).pipe(
            finalize(() => this.isLoading$$.next(false))
        ).subscribe({
            next: (result: Course | string) => {
                if (typeof result === 'string') {
                    console.error('Error creating course: ', result);
                } else {
                    this.getAll();
                    this.router.navigate(['/courses', result.id]);
                }
            },
            error: (error) => {
                console.error('Error creating course: ', error);
            }
        })
    }

    getCourse(id: string) {
        this.isLoading$$.next(true);
        this.coursesService.getCourse(id).pipe(
            finalize(() => this.isLoading$$.next(false))
        ).subscribe({
            next: (result: Course | string) => {
                if (typeof result === 'string') {
                    console.error('Error fetching course: ', result)
                } else {
                    const courses = this.courses$$.getValue();
                    const index = courses.findIndex(c => c.id === result.id);
                    if(index !== -1) {
                        courses[index] = result;
                        this.courses$$.next(courses);
                    } else {
                        this.courses$$.next([...courses, result]);
                    }

                }
            },
            error: (error) => {
                console.error('Error fetching course: ', error);
            }
        })
    }

    editCourse(id: string, course: Course) {
        this.isLoading$$.next(true);
        this.coursesService.editCourse(id, course).pipe(
            finalize(() => this.isLoading$$.next(false))
        ).subscribe({
            next: (result: Course | string) => {
                if (typeof result === 'string') {
                    console.error('Error fetching course: ', result)
                } else {
                    const courses = this.courses$$.getValue();
                    const index = courses.findIndex(c => c.id === id);
                    if (index !== -1) {
                        courses[index] = result;
                        this.courses$$.next(courses);
                        this.router.navigate(['/courses', id]);
                    }
                }
            },
            error: (error) => {
                console.error('Error editing course: ', error)
            }
        })
    }

    deleteCourse(id: string) {
        this.isLoading$$.next(true);
        this.coursesService.deleteCourse(id).pipe(
            finalize(() => this.isLoading$$.next(false))
        ).subscribe({
            next: (successful: boolean) => {
                if (!successful) {
                    console.error('Error deleting course: ')
                } else {
                    const courses = this.courses$$.getValue();
                    this.courses$$.next(courses.filter(c => c.id !== id));
                }
            },
            error: (error) => {
                console.error('error deleting a course', error);
            }
        })
    }

    filterCourses(value: string) {
        this.isLoading$$.next(true);
        this.coursesService.filterCourses(value).pipe(
            finalize(() => this.isLoading$$.next(false))
        ).subscribe({
            next: (result: Course[] | string) => {
                if (Array.isArray(result)) {
                    this.courses$$.next(result);
                } else {
                    console.error('Error fetching filtered courses: ', result);
                    this.courses$$.next([]);
                }
            },
            error: (error) => {
                console.error('Error fetching filtered courses: ', error);
                this.courses$$.next([]);
            }
        })
    }

    getAllAuthors() {
        this.isLoading$$.next(true);
        this.coursesService.getAllAuthors().pipe(
            finalize(() => this.isLoading$$.next(false))
        ).subscribe({
            next: (result: Author[] | string) => {
                if (Array.isArray(result)) {
                    this.authors$$.next(result);
                } else {
                    console.error('Error fetching authors: ', result);
                    this.authors$$.next([]);
                }
            },
            error: (error) => {
                console.error('Error fetching authors: ', error)
                this.authors$$.next([]);
            }
        })
    }

    createAuthor(name: string) {
        this.isLoading$$.next(true);
        this.coursesService.createAuthor(name).pipe(
            finalize(() => this.isLoading$$.next(false))
        ).subscribe({
            next: (resp: string | Author) => {
                if(resp) {
                    this.getAllAuthors();
                }
            },
            error: (error) => {
                console.error('error creating an author', error);
            }
        })
    }

    getAuthorById(id: string) {
        this.isLoading$$.next(true);
        this.coursesService.getAuthorById(id).pipe(
            finalize(() => this.isLoading$$.next(false))
        ).subscribe({
            next: (result: Author | string) => {
                if (typeof result === 'string') {
                    console.error('Error fetching author: ', result)
                } else {
                    const authors = this.authors$$.getValue();
                    const index = authors.findIndex(c => c.id === result.id);
                    if(index !== -1) {
                        authors[index] = result;
                        this.authors$$.next(authors);
                    } else {
                        this.authors$$.next([...authors, result]);
                    }

                }
            },
            error: (error) => {
                console.error('error getting an author: ', error);
            }
        })
    }
}
