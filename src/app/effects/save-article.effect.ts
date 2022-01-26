import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map, mergeMap, catchError, concatMap, withLatestFrom } from 'rxjs/operators';

import { AppState, EditArticleView, Article } from '../model';

import { ArticleService } from '../services/article.service';

import { articleSavedResponse } from '../actions/article-saved-response.action';
import { genericError } from '../actions/generic-error.action';
import { saveArticle } from '../actions/save-article.action';
import { unauthorisedResponse } from '../actions/unauthorised-response.action';

import { selectArticleUnderEditWithToken } from '../selectors/article.selector';
import { UNAUTHORIZED } from '../status-code.constants';
import { mergeCachedAndEditedArticles } from './utils/merge-cached-and-edited-articles';


@Injectable()
export class SaveArticleEffects {

  saveArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveArticle), // when type is 'saveArticle'
      concatMap(action => of(action).pipe( // combine this action with article from store and JWT
        withLatestFrom(this.store.pipe(select(selectArticleUnderEditWithToken)))
      )),
      mergeMap(([ action, {article: cachedArticle, token}]) => {
				const editedArticle: EditArticleView = action.article;

				const article: Article = mergeCachedAndEditedArticles(cachedArticle, editedArticle);

        return this.articleService.updateArticle(article, token)
          .pipe(
            map(() => (articleSavedResponse({ article }))),
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

