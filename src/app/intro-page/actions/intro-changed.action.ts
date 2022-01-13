import { createAction, props } from '@ngrx/store';

export const introChanged = createAction(
  '[EditIntro Page] Intro Changed',
  props<{ body: string }>()
);

export const nullAction = createAction('Null Action');
