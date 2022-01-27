import { createSelector } from '@ngrx/store';
import { AppState, UI } from '../model';

export const selectUI = (state: AppState) => state.ui;

export const selectSaving = createSelector(
  selectUI,
  (state: UI) => state.saving
);

export const selectLoadingTokens = createSelector(
	selectUI,
	(state: UI) => state.loadingTokens,
);


