import { createReducer, on } from '@ngrx/store';
import { AppState, Project } from '../model';
import {
	saveProjectRequest,
	openEditForm,
	getProjectsResponse,
	saveProjectResponse,
	createProjectRequest,
	saveNewProjectResponse,
	deleteLocalProject,
	deleteProjectRequest,
	deleteProjectResponse,
	putProjectIntoStore,
} from '../actions/projects.action';

let latestId = 1;

const createId = () => {
	latestId++;
	return '_' + latestId;
}

const initialState = null;

export const getProjectsResponseReducer = (state: Array<Project>, action: any) => {
	return action.projects;
};

export const openEditFormReducer = (state: any, action: any) => {
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

export const saveProjectRequestReducer = (state: any, action: any) => {

	return state.map(project => {
		if (project.id === action?.project?.id) {
			return {
				...project,
				...action.project,
				saved: true,
			};
		}

		return project;
	});
};

export const saveProjectResponseReducer = (state: Array<Project>, action: any) => {
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
		tags: {
			'angular': false,
			'react': false,
			'javascript': false,
			'css': false,
			'html-5': false,
		},
		underEdit: true,
		published: false,
		saved: true,
	};

	return [ newProject, ...state ];
};

export const saveNewProjectResponseReducer = (state: Array<Project>, action: any) => {

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


export const putProjectIntoStoreReducer = (state: Array<Project>, action: any) => {

	return state.map((project: Project) => {
		if (project.id == action.data.id) {
			return {
				...project,
				...action.data,
				saved: false,
			};
		} 

		return project;
	});
};

const _projectsReducer = createReducer(
	initialState,
	on(getProjectsResponse, getProjectsResponseReducer),

	on(openEditForm, openEditFormReducer),

	on(deleteProjectRequest, deleteProjectRequestReducer),
	on(deleteProjectResponse, deleteProjectResponseReducer),

	on(saveProjectRequest, saveProjectRequestReducer),
	on(saveProjectResponse, saveProjectResponseReducer),

	on(saveNewProjectResponse, saveNewProjectResponseReducer),

	on(createProjectRequest, createProjectRequestReducer),

	on(deleteLocalProject, deleteProjectResponseReducer),

	on(putProjectIntoStore, putProjectIntoStoreReducer),
);



export function projectsReducer(state: Array<Project>, action: any) {
	return _projectsReducer(state, action);
}

