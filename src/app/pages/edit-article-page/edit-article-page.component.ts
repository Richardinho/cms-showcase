import { Inject, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { tap, map, startWith } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { ARTICLE_SERVICE, IArticleService } from '../../services/interfaces/article.service';

import { AppState, Article } from '../../model';

import { putArticleIntoStore, getArticleRequest, saveArticleRequest } from '../../actions/article.action';

import { selectArticleUnderEdit } from '../../selectors/article.selector';
import { selectSaving } from '../../selectors/ui.selector';
import { selectUnsavedChanges } from '../../selectors/article.selector';
import { selectLoadingTokens } from '../../selectors/ui.selector';

import { createArticlePatchData, articleToFormGroup } from './utils/article-form.utils';
import { tagsValidator } from './utils/tags.validator';
import { tagData } from '../../tag-data';

@Component({
  selector: 'app-edit-article-page',
  templateUrl: './edit-article-page.component.html',
  styleUrls: ['./edit-article-page.component.scss']
})
export class EditArticlePageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
		@Inject(ARTICLE_SERVICE) private articleService: IArticleService,
    private store: Store<AppState>
  ) {}

  article$: Observable<Article>;
	showLoader$: Observable<boolean>;
	disabled$: Observable<boolean>;
	form: FormGroup;

  ngOnInit() {

		this.form = new FormGroup({
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

		/*
		 *  when form data changes, put this into store
		 */ 

		this.form.valueChanges.subscribe((value) => {
			const metadata = {
				data: value,
			};

			const action = putArticleIntoStore(metadata);

			this.store.dispatch(action);
		});

		/*
		 *  get article from store
		 */

    this.article$ = this.store.pipe(select(selectArticleUnderEdit));


		/*
		 *  when data in store changes, put this data into form
		 */

    this.article$.subscribe(article => {
      if (article) {

        this.form
          .patchValue(articleToFormGroup(article),
            { emitEvent: false });
      }
    });

		/*
		 *  show loader animation when request is in transit
		 */

		this.showLoader$ = this.store.pipe(
			select(selectLoadingTokens),
			map((loadingTokens: Array<string>) => loadingTokens.includes('__edit_article__')),
			startWith(false),
		);

		/*
		 *  the update CTA should be disabled when:
		 *  1. changes are in transit to server
		 *  2. form input is invalid
		 *  3. there are no local changes requiring to be saved 
		 */

		const formInvalid$ = this.form.statusChanges.pipe(
			map(status => (status !== 'VALID')),
			startWith(false),
		);

		const saved$ = this.article$.pipe(
			map(data => {
				return data?.saved;
			}),
		);

		this.disabled$ = combineLatest(
			this.showLoader$,
			formInvalid$,
			saved$,
		).pipe(
			map(([loading, formInvalid, saved]) => (loading || formInvalid || saved)),
		);

		/*
		 *  dispatch request to fetch data from store
		 */

    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');

      this.store.dispatch(getArticleRequest({
        id,
        redirectUrl: '/edit-article/' + id }));
    });
  }

  update(id: string) {
		return () => {
			const metadata = {
				id,
				loadingToken: '__edit_article__',
			};

			const action = saveArticleRequest(metadata);

			this.store.dispatch(action);
		};
  }

	get tags() {
		return this.form.get('tags');
	}

	get tagList() {
		return tagData;
	}

	get formDisabled() {
		return this.form.invalid;
	}
}
