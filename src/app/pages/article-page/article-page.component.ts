import { Inject, Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { AppState, ArticleLink } from '../../model';

import { selectArticleLinks } from '../../selectors/select-article-links';
import { Store, select } from '@ngrx/store';
import { selectJWTToken } from '../../selectors/article.selector';

import { requestArticleLinks } from '../../actions/request-article-links';
import { requestPublishArticle } from '../../actions/request-publish-article';
import { createArticleRequest } from '../../actions/article.action';
import { ARTICLE_SERVICE, IArticleService } from '../../services/interfaces/article.service';

// change name to ArticleLinksPageComponent
@Component({
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
	articles: Array<ArticleLink> = [];

  constructor(
    private store: Store<AppState>,
		@Inject(ARTICLE_SERVICE) private articleService: IArticleService,
  ) {}

  ngOnInit() {
		this.store.pipe(
			select(selectJWTToken),
			mergeMap((token) => this.articleService.getArticleLinks(token)),
		).subscribe(articles => {
				this.articles = articles;
			});
  }

	createArticle() {
		const action = createArticleRequest();

		this.store.dispatch(action);
	}
}
