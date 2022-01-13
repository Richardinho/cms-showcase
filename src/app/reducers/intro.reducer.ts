import { createReducer, on } from '@ngrx/store';
import { introChanged } from '../intro-page/actions/intro-changed.action';

const initialState = {};

export const introChangedReducer = (state: any, action: any) => {
	return { ...state, body: action.body };
};

const _introReducer = createReducer(
	initialState,
	on(introChanged, introChangedReducer)
);

export function introReducer(state: any, action: any) {
	return _introReducer(state, action);
} 
