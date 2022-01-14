import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { tap, map, mergeMap, switchMap, catchError, concatMap, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../model';

import { IntroService } from '../services/intro.service';

import { introRequest } from '../pages/intro-page/actions/intro-request.action';
import { introChanged, nullAction } from '../pages/intro-page/actions/intro-changed.action';
import { saveIntro } from '../pages/intro-page/actions/save-intro.action';
import { unauthorisedResponse } from '../pages/edit-article-page/actions/unauthorised-response.action';
import { genericError } from '../pages/edit-article-page/actions/generic-error.action';

import { UNAUTHORIZED } from '../status-code.constants';

export const selectJWTToken = (state: AppState) => state.jwt_token;

export const selectIntroWithJWTToken = (state: AppState) => {
	return {
		intro: state.intro,
		jwt: state.jwt_token,
	};
};

const foo = (srcJSON) => {
	const result: any = {};
	result.body = srcJSON.intro_text;
	return result;
}

/*
const combineActionWithJWT = (action) => {
	return of(action).pipe(withLatestFrom(this.store.pipe(select(selectIntroWithToken))));
};
*/

/*
const updateIntro = ([action, intro]) => {
	return this.introService.updateIntro(intro)
		.pipe(
			map((a) => {
				console.log('blah blah', a);
				return of('i like turtiles');
			}),
			catchError(error => {
				return of(genericError({message: 'lalalalal'}));
			}),
		);
};
*/

@Injectable()
export class GetIntroEffects {

  getIntro$ = createEffect(() =>
    this.actions$.pipe(
      ofType(introRequest),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(selectJWTToken)))
      )),
      switchMap(([action, token]) => {

        return this.introService.getIntro(token)
          .pipe(
            map((introJSON) => introChanged(foo(introJSON))),
            catchError((error) => {
              if (error.status) {
                //  if we are unauthorised, we will dispatch an unauthorised response which results
                //  in redirection to login page
                if (error.status === UNAUTHORIZED) {
                  return of(unauthorisedResponse({ redirectUrl: '/home' }));
                } else {
                  return of(genericError({ message: 'Server error occurred' }));
                }
              } else {
                return of(genericError({ message: 'Check your network' }));
              }
            })
          );
      })
    ));

		saveIntro$ = createEffect(() => {
			return this.actions$.pipe(
				ofType(saveIntro),
				concatMap(action => of(action).pipe(
					withLatestFrom(this.store.pipe(select(selectIntroWithJWTToken))),
				)),
				mergeMap(([action, introWithToken]) => {
					return this.introService.saveIntro(action, introWithToken).pipe(
						map(blah => nullAction()),
						catchError((error) => {
              if (error.status) {
                if (error.status === UNAUTHORIZED) {
                  return of(unauthorisedResponse({ redirectUrl: '/home' }));
                } else {
                  return of(genericError({ message: 'Server error occurred' }));
                }
              } else {
                return of(genericError({ message: 'Check your network' }));
              }
						}),
					);
				}),
			);
		});

  constructor(
    private actions$: Actions,
    private introService: IntroService,
    private store: Store<AppState>,
  ) {}
}

