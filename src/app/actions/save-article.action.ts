import { createAction, props } from '@ngrx/store';
import { EditArticleView } from '../model';

export const saveArticleRequest = createAction(
  '[EditArticle Page] Save Article Request',
	props<{loadingToken: string, id: string}>(),
);

