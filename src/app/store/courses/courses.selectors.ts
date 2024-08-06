import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState, coursesFeatureKey } from "./courses.reducer";
import { State } from '../index';


export const selectCoursesState = createFeatureSelector<State, CoursesState>(coursesFeatureKey);

// Add your code here
export const isAllCoursesLoadingSelector = createSelector(selectCoursesState, (state: CoursesState) => state.isAllCoursesLoading);
export const isSearchingStateSelector = createSelector(selectCoursesState, (state: CoursesState) => state.isSearchState);
export const isSingleCourseLoadingSelector = createSelector(selectCoursesState, (state: CoursesState) => state.isSingleCourseLoading);
export const getCourses = createSelector(selectCoursesState, (state: CoursesState) => state.allCourses);// TODO: check if this is correct. dunno what was the intention here
export const getAllCourses = createSelector(selectCoursesState, (state: CoursesState) => state.allCourses);
export const getCourse = createSelector(selectCoursesState, (state: CoursesState) => state.course);
export const getErrorMessage = createSelector(selectCoursesState, (state: CoursesState) => state.errorMessage);