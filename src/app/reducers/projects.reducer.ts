import { createReducer, on } from '@ngrx/store';
import { AppState, Project } from '../model';
import {
	saveProject,
	editProject,
	projectsResponse,
	projectSavedResponse,
} from '../actions/projects.action';

const initialState = null;

export const projectsResponseReducer = (state: any, action: any) => {
	return action.projectsJSON;
};

export const editProjectReducer = (state: any, action: any) => {
	return state.map(project => {
		if (project.id === action.id) {
			return {
				...project,
				underEdit: action.edit
			};
		}

		return project;
	});
};

export const saveProjectReducer = (state: any, action: any) => {

	return state.map(project => {
		if (project.id === action?.project?.id) {
			return { ...project, ...action.project };
		}

		return project;
	});
};

export const projectSavedResponseReducer = (state: any, action: any) => {
	return state.map(project => {
		if (project.id === action?.id) {
			return {
				...project,
				// When project changes are saved on the server, we want to 
				// signal that the edit is over and we can close the form
				underEdit: false
			};
		}

		return project;
	});
};

const _projectsReducer = createReducer(
	initialState,
	on(projectsResponse, projectsResponseReducer),
	on(editProject, editProjectReducer),
	on(saveProject, saveProjectReducer),
	on(projectSavedResponse, projectSavedResponseReducer),
);

export function projectsReducer(state: AppState, action: any) {
	return _projectsReducer(state, action);
}

