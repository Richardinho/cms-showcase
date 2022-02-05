import { Inject, Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { AppState, ArticleLink } from '../../model';

import { Store, select } from '@ngrx/store';
import { JWTToken } from '../../selectors/jwt-token.selector';

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
			select(JWTToken),
			mergeMap((token) => this.articleService.getArticleLinks(token)),
		).subscribe(articles => {
				this.articles = articles;
			});
  }

	createArticle() {
		// TODO
		console.log('create article');
	}
}
