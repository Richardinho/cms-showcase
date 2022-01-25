import { createSelector, State } from '@ngrx/store';
import { AppState, Articles, Project } from '../model';

export const selectProjects = (state: AppState) => state.projects;
export const selectJWTToken = (state: AppState) => state?.jwt_token;

export const selectProjectsWithJWTToken = createSelector(
	selectProjects,
	selectJWTToken,
	(projects: Array<Project>, token: string) => ({ projects, token })
);

