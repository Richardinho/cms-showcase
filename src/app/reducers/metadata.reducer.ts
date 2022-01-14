import { createReducer, on } from '@ngrx/store';
import { metadataResponse } from '../actions/metadata.action';
import { updateMetadataResponse } from '../actions/update-metadata.action';

export const initialState = {
  github_url: '',
};

export const reducer = (state: any, action: any) => {
  return action.metadata ;
}

const _metadataReducer = createReducer(initialState,
  on(metadataResponse, reducer),
  on(updateMetadataResponse, reducer),
);

export function metadataReducer(state: any, action: any) { 
  return _metadataReducer(state, action);
}
