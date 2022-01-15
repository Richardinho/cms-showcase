import { createAction, props } from '@ngrx/store';

export const introChanged = createAction(
  '[EditIntro Page] Intro Changed',
  props<{ body: string, saved: boolean }>()
);

export const nullAction = createAction('Null Action');
