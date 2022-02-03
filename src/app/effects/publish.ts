import { Inject, Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, concatMap, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../model';

import { ARTICLE_SERVICE, IArticleService } from '../services/interfaces/article.service';

import {
	getArticleResponse,
	articleFoundInCache,
} from '../actions/article.action';

import { unauthorisedResponse } from '../actions/unauthorised-response.action';
import { genericError } from '../actions/generic-error.action';
import { publishArticleResponse } from '../actions/publish-article-response';

import { articleLinksResponse } from '../actions/article-links-response';
import { requestArticleLinks } from '../actions/request-article-links';
import { requestPublishArticle } from '../actions/request-publish-article';

import { selectArticle } from '../selectors/article.selector';
import { selectJWTToken } from '../selectors/article.selector';

import {
  UNAUTHORIZED,
  NOT_FOUND,
} from '../status-code.constants';

@Injectable()
export class PublishEffects {

  publishArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestPublishArticle),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(selectJWTToken)))
      )),
      switchMap(([action, token]) => {
        return this.articleService.publishArticle(action.id, action.publish, token)
          .pipe(
            map((articleJSON) => publishArticleResponse({ articleJSON })),
            catchError((error) => {
              if (error.status) {
                if (error.status === UNAUTHORIZED) {
                  return of(unauthorisedResponse({ redirectUrl: '/' }));
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

