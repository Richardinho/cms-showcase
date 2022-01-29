import { Article } from '../model';
import { createAction, props } from '@ngrx/store';

export const saveArticleResponse = createAction(
  '[EditArticle Page] Article Saved Response',
  props<{ loadingToken: string }>()
);
