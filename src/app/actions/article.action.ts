import { Article } from '../model';
import { createAction, props } from '@ngrx/store';


export const getArticleRequest = createAction(
  '[Article] Article Request',
  props<{ id: string, redirectUrl: string }>()
);

export const getArticleResponse = createAction(
  '[Article] Get Article Response',
  props<{ article: Article }>()
);

export const saveArticleRequest = createAction(
  '[Article] Save Article Request',
	props<{loadingToken: string, id: string}>(),
);

export const saveArticleResponse = createAction(
  '[Article] Save Article Response',
  props<{ loadingToken: string }>()
);

export const createArticleRequest = createAction(
	'[Article] Create Article Request'
);

export const createArticleResponse = createAction(
  '[Article] Create Article Response',
  props<{ id: string; }>()
);

export const deleteArticleRequest = createAction(
  '[Article] Delete Article',
  props<{ redirectUrl: string }>()
);

export const deleteArticleResponse = createAction(
  '[Article] Delete Article Response',
  props<{ id: string }>()
);

export const putArticleIntoStore = createAction(
  '[Article] Put Article In Store',
  props<{ data: { title: string; id: string; summary: string; body: string } }>()
);

export const articleFoundInCache = createAction(
  '[Article] Article Found In Cache',
  props<{ id: string }>()
);



