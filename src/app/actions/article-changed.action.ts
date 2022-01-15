import { Article } from '../model';
import { createAction, props } from '@ngrx/store';

// todo: the type of these actions aren't very useful since they aren't exclusively 
// associated with pages. e.g., you might be able to delete an article from the article links page, the edit article page, or the article view page. Have to think of a better naming convention.

export const articleChanged = createAction(
  '[EditArticle Page] Article Changed',
  props<{ articlePatchData: any }>()
);
