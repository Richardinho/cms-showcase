import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, ArticleLink } from '../../model';

//import { navigateAway } from './actions/navigate-away';

import { selectArticleLinks } from '../../selectors/select-article-links';

import { requestArticleLinks } from '../../actions/request-article-links';
import { requestPublishArticle } from '../../actions/request-publish-article';
import { createArticleRequest } from '../../actions/create-article.action';

// change name to ArticleLinksPageComponent
@Component({
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  articles$: Observable<Array<ArticleLink>>;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(requestArticleLinks());

    this.articles$ = this.store.pipe(select(selectArticleLinks));
  }

  publish(articleId: string) {
		const metadata = {
			id: articleId,
			publish: true,
		};

		const action = requestPublishArticle(metadata);

    this.store.dispatch(action);
  }

  unpublish(articleId: string) {
		const metadata = {
			id: articleId,
			publish: false
		};

		const action = requestPublishArticle(metadata);

    this.store.dispatch(action);
  }

	createArticle() {
		const action = createArticleRequest();

		this.store.dispatch(action);
	}
}
