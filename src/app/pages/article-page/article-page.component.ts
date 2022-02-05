import { Inject, Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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
		private router: Router,
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
		this.store.pipe(
			select(JWTToken),
			mergeMap((token) => this.articleService.createArticle(token)),
		).subscribe(id => {
				this.router.navigate(['edit-article', id]);
			});
	}
}
