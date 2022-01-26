import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { tap, map, mergeMap, switchMap, catchError, concatMap, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../model';

import { IntroService } from '../services/intro.service';
import { MessageService, ERROR } from '../services/message.service';

import { genericError } from '../actions/generic-error.action';

import {
	introRequest,
	introSaved,
	introNotSavedToServer,
	saveIntro,
	introFoundInCache,
	introChanged,
} from '../actions/intro-request.action';

import { unauthorisedResponse } from '../actions/unauthorised-response.action';

import { UNAUTHORIZED } from '../status-code.constants';

export const selectJWTToken = (state: AppState) => state.jwt_token;

export const selectIntroWithJWTToken = (state: AppState) => {
	return {
		intro: state.intro,
		jwt: state.jwt_token,
	};
};

const mapResponseJSONForStore = (srcJSON) => {
	const result: any = {};
	result.body = srcJSON.intro_text;
	result.saved = true;
	return result;
}

@Injectable()
export class GetIntroEffects {

  getIntro$ = createEffect(() =>
    this.actions$.pipe(
      ofType(introRequest),
			withLatestFrom(this.store.pipe(select(selectIntroWithJWTToken))),
      switchMap(([action, { jwt, intro }]) => {

				if (intro?.body) {
					return of(introFoundInCache());
				}

        return this.introService.getIntro(jwt)
          .pipe(
            map((introJSON) => {
							return introChanged(mapResponseJSONForStore(introJSON))
						}),
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
            })
          );
      })
    ));

		saveIntro$ = createEffect(() => {
			return this.actions$.pipe(
				ofType(saveIntro),
				withLatestFrom(this.store.pipe(select(selectIntroWithJWTToken))),
				mergeMap(([action, introWithToken]) => {
					return this.introService.saveIntro(action, introWithToken).pipe(
						map(() => {
							this.messageService.show('changes saved to server');
							return introSaved();
						}),
						catchError((error) => {
							const metadata = {
								error,
							};

							return of(introNotSavedToServer(metadata));
						}),
					);
				}),
			);
		});

	introNotSaved$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(introNotSavedToServer),
			mergeMap(({error}) => {
				this.messageService.show('changes were not saved to the server', ERROR );

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
	});

  constructor(
    private actions$: Actions,
    private introService: IntroService,
    private store: Store<AppState>,
		private messageService: MessageService,
  ) {}
}

