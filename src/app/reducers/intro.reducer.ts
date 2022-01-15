import { createReducer, on } from '@ngrx/store';
import { introChanged } from '../actions/intro-changed.action';
import { introSaved } from '../actions/intro-request.action';

const initialState = {
	body: '',
	saved: true,
};

/*
 *  when the intro is changed by the user or from data returning from server
 *  In the first case, saved will be false; in the second, saved will be true.
 */

export const introChangedReducer = (state: any, action: any) => {
	return {
		...state,
		body: action.body,
		saved: action.saved,
	};
};

/*
 * When the intro is saved on the server, we mark `saved` as true in the store.
 */

export const introSavedReducer = (state: any, action: any) => {
	return {
		...state,
		saved: true,
	};
};


const _introReducer = createReducer(
	initialState,
	on(introChanged, introChangedReducer),
	on(introSaved, introSavedReducer)
);

export function introReducer(state: any, action: any) {
	return _introReducer(state, action);
} 
