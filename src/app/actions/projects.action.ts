import { createAction, props } from '@ngrx/store';
import { Project } from '../model';

export const projectsRequest = createAction(
  '[Projects] Projects Request',
);

export const projectsFoundInCache = createAction(
	'[Projects] Projects Found In Cache',
);

export const projectsResponse = createAction(
	'[Projects] Projects Response',
	props<{ projects: Array<Project> }>()
);

export const editProject = createAction(
	'[Projects] EditProject',
	props<{ id: string; edit: boolean }>()
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
/////////



/*  DELETE PROJECT */
export const deleteProjectRequest = createAction(
	'[Projects] DeleteProject',
	props<{ id: string; loadingToken: string }>(),
);

export const deleteProjectResponse = createAction(
	'[Projects] Project Deleted Response',
	props<{ id: string; loadingToken: string }>(),
);
///////////

export const deleteLocalProject = createAction(
	'[Projects] DeleteLocalProject',
	props<{ id: string }>(),
);


// creates new project locally in store (NOT on server)
export const createProjectRequest = createAction(
	'[Projects] Project Create Request',
);

// saves the new project to the server
export const saveNewProjectRequest = createAction(
	'[Projects] Project Save New Project Request',
	props<{ project: Project; loadingToken: string }>(),
);

// after response from server that project has been created. Will include new id generated
// on the server
export const createNewProjectResponse = createAction(
	'[Projects] Project Save New Project Response',
	props<{ project: any; currentId: string; loadingToken: string}>(),
);
