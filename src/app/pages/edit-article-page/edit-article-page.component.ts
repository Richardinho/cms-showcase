import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { ArticleService } from '../../services/article.service';

import { AppState, Article } from '../../model';

import { articleChanged } from '../../actions/article-changed.action';
import { articleRequest } from '../../actions/edit-article-request.action';
import { saveArticle } from '../../actions/save-article.action';

import { selectArticleUnderEdit } from '../../selectors/article.selector';
import { selectSaving } from '../../selectors/ui.selector';
import { selectUnsavedChanges } from '../../selectors/article.selector';

import { createArticlePatchData, articleToFormGroup } from './utils/article-form.utils';
import { tagsValidator } from './utils/tags.validator';

@Component({
  selector: 'app-edit-article-page',
  templateUrl: './edit-article-page.component.html',
  styleUrls: ['./edit-article-page.component.scss']
})
export class EditArticlePageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private store: Store<AppState>
  ) {}

  article$: Observable<Article>;
  saving$: Observable<boolean>;
  unsavedChanges$: Observable<boolean>;

	formGroup: FormGroup;

	title: string = '';
	summary: string = '';
	body: string = '';

  ngOnInit() {
		this.formGroup = new FormGroup({
			id: new FormControl(''),
			body: new FormControl('', Validators.required),
			title: new FormControl('', Validators.required),
			summary: new FormControl('', Validators.required),
			tags: new FormGroup({
				'angular': new FormControl(false),
				'html-5': new FormControl(false),
				'javascript': new FormControl(false),
				'react': new FormControl(false),
				'css': new FormControl(false),
			}, tagsValidator),
		});

		//  fetch article from store
    this.article$ = this.store.pipe(select(selectArticleUnderEdit));

    this.article$.subscribe(article => {
      if (article) {
				this.title = article.title;
				this.summary = article.summary;
				this.body = article.body;

        this.formGroup
          .patchValue(articleToFormGroup(article),
            { emitEvent: false });
      }
    });

    //  todo: use this variable: e.g. have a spinner
    this.saving$ = this.store.pipe(select(selectSaving));
    this.unsavedChanges$ = this.store.pipe(select(selectUnsavedChanges));

    this.formGroup.valueChanges.subscribe(formArticle => {
			this.title = formArticle.title;
			this.summary = formArticle.summary;
			this.body = formArticle.body;
    });

    /*
     * when parameters change, we make a request for data
		 * todo: Could simplify this by just getting a snapshot of the params and then
		 * dispatching the action. i.e. I don't have to subscribe to paramMap
     */

    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');

      this.store.dispatch(articleRequest({
        id,
        redirectUrl: '/edit-article/' + id }));
    });
  }

  save() {
		const metadata = {
			article: this.formGroup.value,
		};

		const action = saveArticle(metadata);

		this.store.dispatch(action);
  }

	get tags() {
		return this.formGroup.get('tags');
	}

	get tagList() {
		return this.articleService.tagData;
	}

	get formDisabled() {
		return this.formGroup.invalid;
	}
}
