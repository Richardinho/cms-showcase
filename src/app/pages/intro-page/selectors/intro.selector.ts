import { createSelector, State } from '@ngrx/store';
import { AppState } from '../../../model';

export const selectIntro = (state: AppState) => {
	return state.intro;
};
