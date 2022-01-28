import { createReducer, on } from '@ngrx/store';
import { UI, Article } from '../model';
import { saveArticle } from '../actions/save-article.action';
import { articleSavedResponse } from '../actions/article-saved-response.action';
import { articleRequest } from '../actions/edit-article-request.action';
import { deleteArticleResponse } from '../actions/delete-article-response.action';

import {
	introSaved,
	introChanged,
	saveIntro,
	introNotSavedToServer,
} from '../actions/intro-request.action';

import { navigateAway } from '../actions/navigate-away';
import { articleLinksResponse } from '../actions/article-links-response';
import { publishArticleResponse } from '../actions/publish-article-response';
import { updateLinks } from './utils';
import { updateMetadataRequest, updateMetadataResponse } from '../actions/update-metadata.action';

// actions
import {
	getProjectsResponse,
	saveProjectRequest,
	deleteProjectRequest, 
	deleteProjectResponse,
	saveProjectResponse,
	saveNewProjectRequest,
	saveNewProjectResponse,
} from '../actions/projects.action';

export const initialState: UI = {
  saving: false,
  id_of_article_under_edit: '',
  articleLinks: [],
	loadingTokens: [],
};

const getProjectsResponseReducer = (state: UI, action: any) => {
	return {
		...state,
		projects: action.projectsJSON,
	};
};

/*
 *  set article id when we have navigated to an article or edit page
 */

const articleRequestReducer = (state:UI, action:any) => ({
  ...state,
  id_of_article_under_edit: action.id
});

/*
 *  reset article id after deletion
 */

const deleteArticleReducer = (state:UI, action:any) => ({
  ...state,
  id_of_article_under_edit: '',
});


const articleLinksResponseReducer = (state:UI, action: any) => {
  return {
    ...state,
    articleLinks: action.articleLinks,
  };
};


/*
 *  update links after publishing/unpublishing an article
 */

const publishArticleResponseReducer = (state: UI, action: any) => ({
  ...state,
  articleLinks: updateLinks(state.articleLinks, action.articleJSON),
});

const _uiReducer = createReducer(initialState,
  on(articleRequest, articleRequestReducer),
  on(deleteArticleResponse, deleteArticleReducer),
  on(saveArticle, state => ({ ...state, saving: true })),
  on(articleSavedResponse, state => ({ ...state, saving: false })),
  on(articleLinksResponse, articleLinksResponseReducer),
  on(publishArticleResponse, publishArticleResponseReducer),

  on(updateMetadataRequest, (state: UI, action: any) => ({
		...state,
		loadingTokens: [ ...state.loadingTokens, action.loadingToken ],
	})),

  on(updateMetadataResponse, (state: UI, action: any) => ({
		...state,
		loadingTokens: state.loadingTokens.filter(token => token !== action.loadingToken),
	})),

	on(saveIntro, state => ({ ...state, loading: true })),
	on(introNotSavedToServer, state => ({ ...state, loading: false })),
	on(introSaved, state => ({ ...state, loading: false })),
	on(getProjectsResponse, getProjectsResponseReducer),

	on(saveNewProjectRequest, (state: UI, action: any) => ({
		...state,
		loadingTokens: [
			...state.loadingTokens, action.loadingToken,
		],
	})),

	on(saveNewProjectResponse, (state: UI, action: any) => ({
		...state,
		loadingTokens: state.loadingTokens.filter(token => token !== action.loadingToken),
	})),

	on(saveProjectRequest, (state: UI, action: any) => ({
		...state,
		// todo: remove loading property (and in other reducers)
		loading: true,
		loadingTokens: [...state.loadingTokens, action.loadingToken],
	})),

	on(saveProjectResponse, (state: UI, action: any) => ({
		...state,
		loading: false,
		loadingTokens: state.loadingTokens.filter(token => token !== action.loadingToken)
	})),

	on(deleteProjectRequest, (state: UI, action: any) => ({
		...state,
		loadingTokens: [...state.loadingTokens, action.loadingToken],
		loading: true,
	})),

	on(deleteProjectResponse, (state: UI, action: any) => ({
		...state,
		loading: false,
		loadingTokens: state.loadingTokens.filter(token => token !== action.loadingToken),
	})),
);

export function uiReducer(state: UI, action: any) {
  return _uiReducer(state, action);
}
