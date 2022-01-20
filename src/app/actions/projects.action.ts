import { createAction, props } from '@ngrx/store';

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
