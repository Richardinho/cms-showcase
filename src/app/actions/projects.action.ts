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
	props<{ projectsJSON: any }>()
);

export const editProject = createAction(
	'[Projects] EditProject',
	props<{ id: string; edit: boolean }>()
);

export const saveProject = createAction(
	'[Projects] SaveProject', 
	props<{project: Project}>(),
);

export const projectSavedResponse = createAction(
	'[Projects] Project Saved Response',
	props<{ id: string }>(),
);

export const deleteProject = createAction(
	'[Projects] DeleteProject',
	props<{ id: string }>(),
);

export const projectDeletedResponse = createAction(
	'[Projects] Project Deleted Response',
	props<{ id: string }>(),
);
