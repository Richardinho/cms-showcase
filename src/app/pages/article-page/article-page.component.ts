import { Inject, Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { AppState, ArticleLink } from '../../model';

import { Store, select } from '@ngrx/store';
import { JWTToken } from '../../selectors/jwt-token.selector';
import { ERROR, INFO, MessageService } from '../../services/message.service';

import { ARTICLE_SERVICE, IArticleService } from '../../services/interfaces/article.service';

// change name to ArticleLinksPageComponent
@Component({
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
	articles: Array<ArticleLink> = [];
	loadingInProgress: boolean = false;

  constructor(
    private store: Store<AppState>,
		private router: Router,
		private messageService: MessageService,
		@Inject(ARTICLE_SERVICE) private articleService: IArticleService,
  ) {}

  ngOnInit() {
		this.store.pipe(
			select(JWTToken),
			mergeMap((token) => this.articleService.getArticleLinks(token)),
		).subscribe({
				next: (articles: Array<ArticleLink>) => {
					this.articles = articles;
				},

				error: (err) => {
					this.messageService.show('An error occurred. Please check your network', ERROR);
				},
			});
  }

	createArticle() {
		return () => {
			this.loadingInProgress = true;

			this.store.pipe(
				select(JWTToken),
				mergeMap((token) => this.articleService.createArticle(token)),
			).subscribe({
					next: (id) => {
						this.loadingInProgress = false;
						this.router.navigate(['edit-article', id]);
					},

					error: (err) => {
						this.loadingInProgress = false;
						this.messageService.show('An error occurred. Please check your network', ERROR);
					},
				});
		}
	}
}
