import { createReducer, on } from '@ngrx/store';

 import {
  putArticleIntoStore,
  saveArticleRequest,
  saveArticleResponse,
  deleteArticleResponse,
  getArticleResponse,
 } from '../actions/article.action';

import { Article, Articles } from '../model';
import { tagData } from '../tag-data';

export const initialState = {};


// store article in articles cache
// note that if article is already in cache, it will be overwritten
export const getArticleResponseReducer = (state:any, action:any): Articles => {
	return {
		...state,
		[action.article.id]: action.article,
	};
};

export const putArticleIntoStoreReducer = (state:Articles, action:any) => {
  const data = action.data;

  const article = state[data.id];

  if (article) {

		const updatedArticle: Article = {
			...article,
			...data,
			saved: false,
		} as Article;

		return {
			...state,
			[data.id]: updatedArticle
		}; 

  } else {
    return state;
  }
};

export const saveArticleRequestReducer = (state: Articles, action: any) => {
	const {id} = action;
	const article: Article = state[id];

	return {
		...state,
		[id]: {
			...article,
			saved: true,
		},
	};
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
	on(saveArticleRequest, saveArticleRequestReducer),
  on(getArticleResponse, getArticleResponseReducer),
  on(putArticleIntoStore, putArticleIntoStoreReducer),
  on(deleteArticleResponse, deleteArticleResponseReducer),
);

export function articlesReducer(state: Articles, action:any) {
  return _articlesReducer(state, action);
}
