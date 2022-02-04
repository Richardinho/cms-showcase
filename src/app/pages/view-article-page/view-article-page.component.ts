import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';

import {
	AppState,
	Article,
} from '../../model';

import { selectJWTToken } from '../../selectors/article.selector';
import { DialogService } from '../../services/dialog.service';

import {
	IArticleService,
	ARTICLE_SERVICE,
} from '../../services/interfaces/article.service';

import { deleteArticleRequest } from '../../actions/article.action';

import { navigateToEditPageRequest } from '../../actions/navigate-to-edit-page-request';

const CONFIRMATION_MESSAGE = 'Are you sure that you want to delete this article?';

@Component({
  selector: 'app-view-article-page',
  templateUrl: './view-article-page.component.html',
  styleUrls: ['./view-article-page.component.scss']
})
export class ViewArticlePageComponent implements OnInit {
	article$: Observable<Article>;

  constructor(
    private route: ActivatedRoute,
		private router: Router,
    private dialogService: DialogService,
    private store: Store<AppState>,
		@Inject(ARTICLE_SERVICE) private articleService: IArticleService,
  ) {}

  ngOnInit() {

		this.article$ = this.route.paramMap.pipe(
			map((params: ParamMap) => params.get('id')),
      withLatestFrom(this.store.pipe(select(selectJWTToken))),
			mergeMap(([id, token]) => this.articleService.getArticle(id, token)),
		);
  }

  editArticle(id: string) {
		console.log('edit article id');
    //this.store.dispatch(navigateToEditPageRequest());
		this.router.navigate(['edit-article', id]);
  }

  deleteArticle() {
    this.dialogService.confirm(CONFIRMATION_MESSAGE)
      .subscribe((canDelete: any) => {
        if (canDelete) {
          this.store.dispatch(deleteArticleRequest({ redirectUrl: '/view-article/'}));
        }});
  }
}
