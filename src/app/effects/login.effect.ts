import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import {
	tap,
	map,
	switchMap,
	catchError,
} from 'rxjs/operators';

import { ILoginService, LOGIN_SERVICE } from '../services/interfaces/login.service';

/*
 * ACTIONS
 *
 */

import { genericError } from '../actions/generic-error.action';
import {
	logInRequest,
	logInResponse,
	logOut,
} from '../actions/log-in.action';
import { unauthorisedResponse } from '../actions/unauthorised-response.action';

import { UNAUTHORIZED } from '../status-code.constants';

@Injectable()
export class LogInEffects {

  logOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logOut),
      tap(() => {
        this.router.navigate(['/login']);
      }),
    );
  }, { dispatch: false});

  unauthorised$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unauthorisedResponse),
      tap(({ redirectUrl }) => {
        const navigationExtras = {
          queryParams : {
            afterLogin: redirectUrl }};

        this.router.navigate(['/login'], navigationExtras);
      })
    ), { dispatch: false });

  logInRequest$ = createEffect(() => 
    this.actions$.pipe(
      ofType(logInRequest),
      switchMap(action => { 
        return this.loginService.logIn(action.username, action.password)
          .pipe(
            map(({ jwt_token }) => logInResponse({ redirectUrl: action.redirectUrl, jwt_token })),
            catchError((error) => {
              if (error.status) {
                if (error.status === UNAUTHORIZED) {
                  // actually, what this should signal that an error message should be displayed on the login page
                  return of(unauthorisedResponse({ redirectUrl: action.redirectUrl }));
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

  logInResponse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logInResponse),
      tap((action) => {
        this.router.navigate([action.redirectUrl]);
      }),
    )
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private router: Router,
    @Inject(LOGIN_SERVICE) private loginService: ILoginService,
  ) {}
}
