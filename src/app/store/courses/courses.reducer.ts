import { Course } from '@app/services/courses.service';
import { Action, on, createReducer } from '@ngrx/store';
import * as CoursesActions from './courses.actions';

// Add your code here
export const coursesFeatureKey = 'courses';

export interface CoursesState {
    // Add your code here
    allCourses: Course[];
    course: Course | null;
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean;
    isSearchState: boolean;
    errorMessage: string;
}

export const initialState: CoursesState = {
    // Add your code here
    allCourses: [],
    course: null,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: '',
};

export const coursesReducer = createReducer(
    initialState,
    on(CoursesActions.requestAllCourses, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: '',
    })),
    on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: '',
        allCourses: courses,
    })),
    on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error,
    })),
    on(CoursesActions.requestSingleCourse, (state, { id }) => ({
        ...state,
        isSingleCourseLoading: true,
        errorMessage: '',
    })),
    on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage: '',
        course: course,
    })),
    on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage: error,
    })),
    on(CoursesActions.requestFilteredCourses, (state, { title }) => ({
        ...state,
        isSearchState: true,
        errorMessage: '',
    })),
    on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
        ...state,
        isSearchState: false,
        errorMessage: '',
        allCourses: courses,
    })),
    on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
        ...state,
        isSearchState: false,
        errorMessage: error,
    })),
    on(CoursesActions.requestDeleteCourse, (state, { id }) => ({
        ...state,
        errorMessage: '',
    })),
    on(CoursesActions.requestDeleteCourseSuccess, (state, { id }) => ({
        ...state,
        errorMessage: '',
        allCourses: state.allCourses.filter(course => course.id !== id)
    })),
    on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error,
    })),
    on(CoursesActions.requestEditCourse, (state, { id, course }) => ({
        ...state,
        errorMessage: '',
    })),
    on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
        ...state,
        errorMessage: '',
        course: course.id === state.course?.id ? course : state.course,
        allCourses: state.allCourses.map((stateCourse) => stateCourse.id == course.id ? course : stateCourse)
    })),
    on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error,
    })),
    on(CoursesActions.requestCreateCourse, (state, { course }) => ({
        ...state,
        errorMessage: '',
    })),
    on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
        ...state,
        errorMessage: '',
        allCourses: [...state.allCourses, course],
    })),
    on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error,
    })),
);

export const reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action);
