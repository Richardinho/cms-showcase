import { createAction, props } from '@ngrx/store';
import { FormControlStatus } from '@angular/forms';

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
export const saveIntroRequest = createAction(
  '[Intro] Save Intro',
	props<{ loadingToken: string }>(),
);


// after intro has been saved to server
export const saveIntroResponse = createAction(
	'[Intro] IntroSaved',
	props<{ loadingToken: string }>(),
);

// when intro is already in store so we don't need to go to server
export const introFoundInCache = createAction(
  '[Intro] Intro Found in Cache',
);

// input has been made into intro form
export const putIntroIntoStore = createAction(
  '[Intro] Intro Changed',
	props<{ body: string }>(),
);

export const introStatusChanged = createAction(
	'[Intro] Intro Status Changed',
	props<{ status: FormControlStatus }>(),

);
