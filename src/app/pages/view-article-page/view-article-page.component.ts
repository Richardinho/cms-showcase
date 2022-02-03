import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { Store, select, createSelector, State } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, mergeMap } from 'rxjs/operators';

import { AppState, Article } from '../../model';
import { selectArticleUnderEdit } from '../../selectors/article.selector';
import { DialogService } from '../../services/dialog.service';

import { deleteArticleRequest, getArticleRequest } from '../../actions/article.action';

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
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.article$ = this.store.pipe(select(selectArticleUnderEdit));

    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');

      this.store.dispatch(getArticleRequest({
        id,
        redirectUrl: '/view-article/' + id }));
    });
  }

  editArticle() {
    this.store.dispatch(navigateToEditPageRequest());
  }

  deleteArticle() {
    this.dialogService.confirm(CONFIRMATION_MESSAGE)
      .subscribe((canDelete: any) => {
        if (canDelete) {
          this.store.dispatch(deleteArticleRequest({ redirectUrl: '/view-article/'}));
        }});
  }
}
