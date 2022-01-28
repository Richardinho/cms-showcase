import { createAction, props } from '@ngrx/store';

export const updateMetadataRequest = createAction(
  '[Configuration Page] Update Metadata Request',
  props<{ loadingToken: string, metadata: { github_url: string }}>()
);

export const updateMetadataResponse = createAction(
  '[Configuration Page] Update Metadata Response',
  props<{ loadingToken: string, metadata: { github_url: string }}>()
);

export const putMetadataIntoStore = createAction(
  '[Configuration Page] Put Metadata into store',
  props<{ metadata: { github_url: string }}>()
);
