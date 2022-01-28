import { createReducer, on } from '@ngrx/store';
import { metadataResponse } from '../actions/metadata.action';
import {
	updateMetadataResponse,
	updateMetadataRequest,
	putMetadataIntoStore,
} from '../actions/update-metadata.action';

export const initialState = {
  github_url: '',
	saved: true,
};

export const reducer = (state: any, action: any) => {
  return {
		...action.metadata,
		saved: true,
	};
}

export const updateMetadataRequestReducer = (state: any, action: any) => {
	return {
		...state,
		saved: true,
	};
};

export const putMetadataIntoStoreReducer = (state: any, action: any) => {
	return {
		...state,
		...action.metadata,
		saved: false,
	};
};

const _metadataReducer = createReducer(initialState,
  on(metadataResponse, reducer),
	on(updateMetadataRequest, updateMetadataRequestReducer),

	// for now, do nothing
  on(updateMetadataResponse, (state: any) => {
		return {
			...state, 
		};
	}),

	on(putMetadataIntoStore, putMetadataIntoStoreReducer),
);

export function metadataReducer(state: any, action: any) { 
  return _metadataReducer(state, action);
}
