import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map, switchMap, mergeMap, catchError, concatMap, withLatestFrom } from 'rxjs/operators';

import { AppState, EditArticleView, Article } from '../model';

import { ArticleService } from '../services/article.service';

import {
	saveArticleResponse,
	saveArticleRequest,
} from '../actions/article.action';

import { genericError } from '../actions/generic-error.action';
import { unauthorisedResponse } from '../actions/unauthorised-response.action';

import { selectArticleUnderEditWithToken } from '../selectors/article.selector';
import { UNAUTHORIZED } from '../status-code.constants';


@Injectable()
export class SaveArticleEffects {

  saveArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveArticleRequest), 
			withLatestFrom(this.store.pipe(select(selectArticleUnderEditWithToken))),
      switchMap(([ action, {article, token}]) => {

        return this.articleService.updateArticle(article, token)
          .pipe(
            map(() => (saveArticleResponse({ loadingToken: action.loadingToken }))),
            catchError((error) => {
              if (error.status) {
                if (error.status === UNAUTHORIZED) {
                  return of(genericError({ message: 'unauthorised' }));
                } else {
                  return of(genericError({ message: 'Server error occurred' }));
                }
              } else {
                return of(genericError({ message: 'Check your network' }));
              }
            })
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private store: Store<AppState>,
  ) {}
}

