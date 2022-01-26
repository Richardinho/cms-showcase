import { createAction, props } from '@ngrx/store';

// intro page requests intro from server
export const introRequest = createAction(
  '[Intro] Intro Request',
);

// when save to server fails
export const introNotSavedToServer = createAction(
	'[Intro] IntroNotSavedToServer',
	props<{ error: any }>()
);

// save intro to server
export const saveIntro = createAction(
  '[Intro] Save Intro',
);

// after intro has been saved to server
export const introSaved = createAction('[Intro] IntroSaved');

// when intro is already in store so we don't need to go to server
export const introFoundInCache = createAction(
  '[Intro] Intro Found in Cache',
);

// input has been made into intro form
export const introChanged = createAction(
  '[Intro] Intro Changed',
  props<{ body: string, saved: boolean }>()
);

