import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { map, mergeMap, withLatestFrom, filter } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';

import {
	AppState,
	Article,
} from '../../model';

import { JWTToken } from '../../selectors/jwt-token.selector';
import { DialogService } from '../../services/dialog.service';
import { ERROR, INFO, MessageService } from '../../services/message.service';

import {
	IArticleService,
	ARTICLE_SERVICE,
} from '../../services/interfaces/article.service';

const CONFIRMATION_MESSAGE = 'Are you sure that you want to delete this article?';

@Component({
  selector: 'app-view-article-page',
  templateUrl: './view-article-page.component.html',
  styleUrls: ['./view-article-page.component.scss']
})
export class ViewArticlePageComponent implements OnInit {
	article: Article;

  constructor(
    private route: ActivatedRoute,
		private router: Router,
    private dialogService: DialogService,
    private store: Store<AppState>,
		private messageService: MessageService,
		@Inject(ARTICLE_SERVICE) private articleService: IArticleService,
  ) {}

	ngOnInit() {

		this.route.paramMap.pipe(
			map((params: ParamMap) => params.get('id')),
			withLatestFrom(this.store.pipe(select(JWTToken))),
			mergeMap(([id, token]) => this.articleService.getArticle(id, token)),
		).subscribe({
				next: (article: Article) => {
					this.article = article;
				},

				error: () => {
					this.messageService.show('An error occurred. Please check your network', ERROR);
				},
			});
	}

  editArticle(id: string) {
		this.router.navigate(['edit-article', id]);
  }

  deleteArticle() {
		this.dialogService.confirm(CONFIRMATION_MESSAGE)
			.pipe(
				filter((canDelete) => {
					return canDelete;
				}),
				withLatestFrom(this.store.pipe(select(JWTToken))),
				mergeMap(([_, token]) => {
					return this.articleService.deleteArticle(this.article.id, token)
				}),
			)
			.subscribe({
				next: () => {
					this.router.navigate(['/article-list']);
				},

				error: () => {
					this.messageService.show('An error occurred. Please check your network', ERROR);
				},
			});
  }
}
