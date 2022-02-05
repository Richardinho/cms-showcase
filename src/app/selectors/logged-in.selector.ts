import { createSelector, State } from '@ngrx/store';
import { AppState } from '../model';

export const selectJWTToken = (state: AppState) => state.jwt_token;

export const loggedIn = createSelector(
  selectJWTToken,
  token => !!token
);
