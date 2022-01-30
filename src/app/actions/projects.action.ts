import { createAction, props } from '@ngrx/store';
import { Project } from '../model';


export const projectsFoundInCache = createAction(
	'[Projects] Projects Found In Cache',
);


export const deleteLocalProject = createAction(
	'[Projects] DeleteLocalProject',
	props<{ id: string }>(),
);

export const putProjectIntoStore = createAction(
	'[Projects] Put Project Into Store',
	props<{data: any}>(),
);


/*  DELETE PROJECT */
export const deleteProjectRequest = createAction(
	'[Projects] DeleteProject',
	props<{ id: string; loadingToken: string }>(),
);

export const deleteProjectResponse = createAction(
	'[Projects] Project Deleted Response',
	props<{ id: string; loadingToken: string }>(),
);

/** SAVE PROJECT **/
export const saveProjectRequest = createAction(
	'[Projects] SaveProject', 
	props<{ project: Project; loadingToken: string }>(),
);

export const saveProjectResponse = createAction(
	'[Projects] Project Saved Response',
	props<{ loadingToken: string; id: string }>(),
);

/** SAVE NEW PROJECT **/
export const saveNewProjectRequest = createAction(
	'[Projects] Project Save New Project Request',
	props<{ project: Project; loadingToken: string }>(),
);

// Will include new id generated on the server
export const saveNewProjectResponse = createAction(
	'[Projects] Project Save New Project Response',
	props<{ project: any; currentId: string; loadingToken: string }>(),
);

/** GET PROJECTS **/
export const getProjectsRequest = createAction(
  '[Projects] Projects Request',
);

export const getProjectsResponse = createAction(
	'[Projects] Projects Response',
	props<{ projects: Array<Project> }>()
);

/** OPEN AND CLOSE EDIT FORM **/
export const openEditForm = createAction(
	'[Projects] EditProject',
	props<{ id: string; edit: boolean }>()
);

/**  CREATE NEW PROJECT **/
// creates new project locally in store (NOT on server)
export const createProjectRequest = createAction(
	'[Projects] Project Create Request',
);

