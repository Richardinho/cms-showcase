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
import { projectsResponse } from '../actions/projects.action';

export const initialState: UI = {
  saving: false,
  id_of_article_under_edit: '',
  articleLinks: [],
  loading: false,
};

const projectsResponseReducer = (state: UI, action: any) => {
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
  on(updateMetadataRequest, state => ({ ...state, loading: true })),
  on(updateMetadataResponse, state => ({ ...state, loading: false })),
	on(saveIntro, state => ({ ...state, loading: true })),
	on(introNotSavedToServer, state => ({ ...state, loading: false })),
	on(introSaved, state => ({ ...state, loading: false })),
	on(projectsResponse, projectsResponseReducer),
);

export function uiReducer(state: UI, action: any) {
  return _uiReducer(state, action);
}
