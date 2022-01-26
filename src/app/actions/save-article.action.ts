import { createAction, props } from '@ngrx/store';
import { EditArticleView } from '../model';

export const saveArticle = createAction(
  '[EditArticle Page] Save Article',
	props<{article: EditArticleView}>(),
);

