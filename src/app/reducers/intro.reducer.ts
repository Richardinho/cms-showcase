import { createReducer, on } from '@ngrx/store';
import {
	introChanged,
	introNotSavedToServer,
	saveIntro,
} from '../actions/intro-request.action';
import { Intro } from '../model';

const initialState: Intro = {
	body: '',
	saved: true,
};

/*
 *  when the intro is changed by the user or from data returning from server
 *  In the first case, saved will be false; in the second, saved will be true.
 */

export const introChangedReducer = (state: Intro, action: any) => {
	return {
		...state,
		body: action.body,
		saved: action.saved,
	};
};


/*
 * If intro is not saved due to server error or network down, then we
 * mark `saved` as false.
 */

export const introNotSavedReducer = (state: Intro, action: any) => {
	return {
		...state,
		saved: false,
	};
};


/*
 * when the request to save the intro is made (not when it is actually saved)
 */

export const introSaveRequestReducer = (state: Intro, action: any) => {
	return {
		...state,
		saved: true,
	};
}

const _introReducer = createReducer(
	initialState,
	on(introChanged, introChangedReducer),
	on(saveIntro, introSaveRequestReducer),
	on(introNotSavedToServer, introNotSavedReducer),
);

export function introReducer(state: Intro, action: any) {
	return _introReducer(state, action);
} 
