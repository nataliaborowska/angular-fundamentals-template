import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

export interface Course {
    title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: string[];
    id?: string;
}

interface BaseResp {
    successful: boolean;
}
interface CourseGetAllResp extends BaseResp {
    result: Course[] | string;
}

interface CourseGetResp extends BaseResp{
    result: Course | string;
}

interface CourseOperationResp extends BaseResp {}

interface CourseCreateResp extends BaseResp {
    result: Course | string;
}

export interface Author {
    name: string;
    id: string;
}

interface AuthorGetAllResp extends BaseResp {
    result: Author[];
}

interface AuthorGetResp extends BaseResp {
    result: Author | string;
}

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    constructor(private httpClient: HttpClient) {}

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: HttpErrorResponse): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`);
            return throwError(result as T);
        };
    }

    getAll(): Observable<Course[] | string> {
        return this.httpClient.get<CourseGetAllResp>(`${this.getLoginUrl()}/courses/all`).pipe(
            map((resp: CourseGetAllResp) => resp.result),
            catchError(this.handleError<Course[] | string>('getAll', []))
        )
    }

    createCourse(course: Course): Observable<Course | string>  {
        return this.httpClient.post<CourseCreateResp>(`${this.getLoginUrl()}/courses/add`, { ...course }).pipe(
            map((resp: CourseCreateResp) => {
                if (resp.successful && typeof resp.result !== 'string') {
                    return resp.result;
                } else {
                    return typeof resp.result === 'string' ? resp.result : 'An unknown error occurred';
                }
            }),
            catchError(this.handleError<Course | string>('createCourse'))
        )
    }

    editCourse(id: string, course: Course): Observable<boolean>  {
        return this.httpClient.put<CourseOperationResp>(`${this.getLoginUrl()}/courses/${id}`, { ...course }).pipe(
            map((resp: CourseOperationResp) => resp.successful),
            catchError(this.handleError<boolean>('editCourse', false))
        )
    }

    getCourse(id: string): Observable<Course | string> {
        return this.httpClient.get<CourseGetResp>(`${this.getLoginUrl()}/courses/${id}`).pipe(
            map((resp: CourseGetResp) => resp.result),
            catchError(this.handleError<Course | string>('getCourse'))
        )
    }

    deleteCourse(id: string): Observable<boolean>  {
        return this.httpClient.delete<CourseOperationResp>(`${this.getLoginUrl()}/courses/${id}`).pipe(
            map((resp: CourseOperationResp) => resp.successful),
            catchError(this.handleError<boolean>('deleteCourse', false))
        )
    }

    filterCourses(value: string): Observable<Course[] | string>  {
        let httpParams = new HttpParams().set('title', value);
        return this.httpClient.get<CourseGetAllResp>(`${this.getLoginUrl()}/courses/filter`, { params: httpParams }).pipe(
            map((resp: CourseGetAllResp) => resp.result),
            catchError(this.handleError<Course[] | string>('filterCourses', []))
        )
    }

    getAllAuthors(): Observable<Author[] | string> {
        return this.httpClient.get<AuthorGetAllResp>(`${this.getLoginUrl()}/authors/all`).pipe(
            map((resp: AuthorGetAllResp) => resp.result),
            catchError(this.handleError<Author[] | string>('getAllAuthors', []))
        )
    }

    createAuthor(name: string): Observable<Author | string> {
        return this.httpClient.post<AuthorGetResp>(`${this.getLoginUrl()}/authors/add`, { name }).pipe(
            map((resp: AuthorGetResp) => resp.result),
            catchError(this.handleError<Author | string>('createAuthor'))
        )
    }

    getAuthorById(id: string): Observable<Author | string> {
        return this.httpClient.get<AuthorGetResp>(`${this.getLoginUrl()}/authors/${id}`).pipe(
            map((resp: AuthorGetResp) => resp.result),
            catchError(this.handleError<Author | string>('getAuthorById'))
        )
    }

    getLoginUrl() {
        return 'http://localhost:4000';
    }
}
