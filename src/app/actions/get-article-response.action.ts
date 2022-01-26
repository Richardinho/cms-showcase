import { createAction, props } from '@ngrx/store';
import { Article } from '../model';

export const getArticleResponse = createAction(
  '[EditArticle Page] Get Article Response',
  props<{ article: Article }>()
);
