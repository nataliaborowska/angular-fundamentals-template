import { ActionReducerMap } from '@ngrx/store';
import { CoursesEffects } from './courses/courses.effects';
import { coursesReducer, CoursesState } from './courses/courses.reducer';

export interface State {
    courses: CoursesState,
}

export const reducers: ActionReducerMap<State> = {
    courses: coursesReducer,
}

export const effects = [CoursesEffects];