import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';

import {
	switchMap,
	tap,
	map,
	catchError,
	withLatestFrom
} from 'rxjs/operators';

import { AppState } from '../model';


import {
	ARTICLE_SERVICE,
	IArticleService
} from '../services/interfaces/article.service';

import { unauthorisedResponse } from '../actions/unauthorised-response.action';
import { genericError } from '../actions/generic-error.action';

import {
	createArticleRequest,
	createArticleResponse,
} from '../actions/article.action';

import { selectJWTToken } from '../selectors/article.selector';

import { UNAUTHORIZED } from '../status-code.constants';

@Injectable()
export class CreateArticleEffects {

  navigateToEditPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createArticleResponse),
      tap(({id}) => {
        this.router.navigate(['/edit-article', id]);
      })
    );
  }, { dispatch: false });

  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArticleRequest),
			withLatestFrom(this.store.pipe(select(selectJWTToken))),
      switchMap(([action, token]) => {
        return this.articleService.createArticle(token)
          .pipe(
            map((id) => createArticleResponse({ id })),
            catchError((error) => {
              if (error.status) {
                if (error.status === UNAUTHORIZED) {
                  return of(unauthorisedResponse({ redirectUrl: '/article-list' }));
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
    private router: Router,
  ) {}
}

