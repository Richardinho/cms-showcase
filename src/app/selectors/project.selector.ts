import { createSelector, State } from '@ngrx/store';
import { AppState, Articles } from '../model';

export const selectProjects = (state: AppState) => state?.projects;
export const selectJWTToken = (state: AppState) => state?.jwt_token;

export const selectProjectsWithJWTToken = createSelector(
	selectProjects,
	selectJWTToken,
	(projects: any, token: string) => ({ projects, token })
);

export const selectProjectLinks = (state: AppState) => {
	const projects = state?.projects;

	if (projects) {
		return Object.keys(projects).map((key) => {
			return projects[key];
		});

	} else {
		return [];
	}
};
