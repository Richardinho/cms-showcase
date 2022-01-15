import { createAction, props } from '@ngrx/store';

export const introRequest = createAction(
  '[Intro Page] Intro Request',
);

export const introSaved = createAction('[Intro] IntroSaved');

export const introNotSavedToServer = createAction(
	'[Intro] IntroNotSavedToServer',
	props<{ error: any }>()
);
