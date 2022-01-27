import { createReducer, on } from '@ngrx/store';
import { AppState, Project } from '../model';
import {
	saveProject,
	editProject,
	projectsResponse,
	projectSavedResponse,
	createProjectRequest,
	createNewProjectResponse,
	deleteLocalProject,
	deleteProjectRequest,
	deleteProjectResponse,
} from '../actions/projects.action';

let latestId = 1;

const createId = () => {
	latestId++;
	return '_' + latestId;
}

const initialState = null;

export const projectsResponseReducer = (state: Array<Project>, action: any) => {
	return action.projects;
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
			return {
				...project,
				...action.project,
			};
		}

		return project;
	});
};

export const projectSavedResponseReducer = (state: Array<Project>, action: any) => {
	return state.map(project => {
		if (project.id === action?.id) {
			return {
				...project,
				// When project changes are saved on the server, we want to 
				// signal that the edit is over and we can close the form
				underEdit: false,
			};
		}

		return project;
	});
};

export const deleteProjectResponseReducer = (state:any, action:any) => {
	return state.filter(project => {
		if (project.id !== action?.id) {
			return project;
		}
	});
};

export const createProjectRequestReducer = (state: any, action: any) => {
	const newProject: Project = {
		id: createId(),
		title: '',
		href: '',
		tag1: '',
		tag2: '',
		tag3: '',
		underEdit: true,
		published: false,
		saved: true,
	};

	return [ newProject, ...state ];
};

export const createNewProjectResponseReducer = (state: Array<Project>, action: any) => {

	return state.map((project: Project) => {
		if (project.id === action.currentId) {
			return {
				...action.project,
				published: Boolean(parseInt(action.project.published, 10)),
				underEdit: false,
			};
		}

		return project;
	});
}

export const deleteProjectRequestReducer = (state: Array<Project>, action: any) => {
	return state.map(project => {
		if (project.id === action.id) {
			return {
				...project,
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
	on(createProjectRequest, createProjectRequestReducer),
	on(createNewProjectResponse, createNewProjectResponseReducer),
	on(deleteLocalProject, deleteProjectResponseReducer),

	on(deleteProjectRequest, deleteProjectRequestReducer),
	on(deleteProjectResponse, deleteProjectResponseReducer),
);

export function projectsReducer(state: Array<Project>, action: any) {
	return _projectsReducer(state, action);
}

