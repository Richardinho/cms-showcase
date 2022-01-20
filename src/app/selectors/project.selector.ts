import { createSelector, State } from '@ngrx/store';
import { AppState, Articles } from '../model';

export const selectProjects = (state: AppState) => state?.ui?.projects;
export const selectJWTToken = (state: AppState) => state?.jwt_token;

export const selectProjectsWithJWTToken = createSelector(
	selectProjects,
	selectJWTToken,
	(projects: any, token: string) => ({ projects, token })
);
