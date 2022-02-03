import { Inject, Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, switchMap, catchError, concatMap, withLatestFrom } from 'rxjs/operators';

import { AppState, Article } from '../model';

import { ARTICLE_SERVICE, IArticleService } from '../services/interfaces/article.service';

import {
	articleFoundInCache,
	getArticleRequest,
	getArticleResponse,
} from '../actions/article.action';

import { genericError } from '../actions/generic-error.action';
import { unauthorisedResponse } from '../actions/unauthorised-response.action';

import { selectArticleWithToken, selectJWTToken } from '../selectors/article.selector';

import { UNAUTHORIZED } from '../status-code.constants';

@Injectable()
export class GetArticleEffects {

  getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticleRequest),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(selectJWTToken)))
      )),
			switchMap(([action, token]) => {
        return this.articleService.getArticle(action.id, token)
          .pipe(
            map((article: Article) => getArticleResponse({ article })),
            catchError((error) => {
              if (error.status) {
                //  if we are unauthorised, we will dispatch an unauthorised response which results
                //  in redirection to login page
                if (error.status === UNAUTHORIZED) {
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

  constructor(
    private actions$: Actions,
		@Inject(ARTICLE_SERVICE) private articleService: IArticleService,
    private store: Store<AppState>,
  ) {}
}

