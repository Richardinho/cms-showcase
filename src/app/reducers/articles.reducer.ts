import { createReducer, on } from '@ngrx/store';
import { articleChanged } from '../actions/article-changed.action';
import { articleSavedResponse } from '../actions/article-saved-response.action';
import { deleteArticleResponse } from '../actions/delete-article-response.action';
import { getArticleResponse } from '../actions/get-article-response.action';

import { Article, Articles } from '../model';
import { tagData } from '../services/article.service';

export const initialState = {};


// store article in articles cache
// note that if article is already in cache, it will be overwritten
export const getArticleResponseReducer = (state:any, action:any): Articles => {
	return {
		...state,
		[action.article.id]: action.article,
	};
};

export const articleChangedReducer = (state:any, action:any) => {
  const articlePatchData = action.articlePatchData;

  const article = state[articlePatchData.id];

  if (article) {

		const updatedArticle: Article = {
			...article,
			...articlePatchData
		} as Article;

		return {
			...state,
			[articlePatchData.id]: updatedArticle
		}; 

  } else {
    return state;
  }
};

/*
 *  deletes article out of cache
 */

export const deleteArticleResponseReducer = (state:any, action:any) => {
	return Object.keys(state).reduce((memo, key) => {
		if (key === action.id) {
			return memo;
		}

		return {
			...memo,
			[key]: state[key]
		};
	}, {});
};

const _articlesReducer = createReducer(initialState,
  on(getArticleResponse, getArticleResponseReducer),
  on(articleChanged, articleChangedReducer),
  on(deleteArticleResponse, deleteArticleResponseReducer),
  on(articleSavedResponse, getArticleResponseReducer),
);

export function articlesReducer(state: any, action:any) {
  return _articlesReducer(state, action);
}
