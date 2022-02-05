import { Inject, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { ARTICLE_SERVICE, IArticleService } from '../../services/interfaces/article.service';

import { AppState, Article } from '../../model';

import { JWTToken } from '../../selectors/jwt-token.selector';

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
	form: FormGroup;
	loadingInProgress: boolean;

  ngOnInit() {

		this.form = new FormGroup({
			id: new FormControl(''),
			body: new FormControl('', Validators.required),
			title: new FormControl('', Validators.required),
			summary: new FormControl('', Validators.required),
			published: new FormControl(false),
			tags: new FormGroup({
				'angular': new FormControl(false),
				'html-5': new FormControl(false),
				'javascript': new FormControl(false),
				'react': new FormControl(false),
				'css': new FormControl(false),
			}, tagsValidator),
		});

		this.article$ = this.form.valueChanges;

		this.route.paramMap.pipe(
			map((params: ParamMap) => params.get('id')),
			withLatestFrom(this.store.pipe(select(JWTToken))),
			mergeMap(([id, token]) => this.articleService.getArticle(id, token)),
		).subscribe(article => {
			this.form.patchValue(articleToFormGroup(article));
    });
  }

  update() {
		this.loadingInProgress = true;

		this.store.pipe(select(JWTToken)).pipe(
			mergeMap((token) => this.articleService.updateArticle(this.form.value, token)),
		).subscribe(() => {
			this.loadingInProgress = false;
		});
  }

	get updateButtonDisabled() {
		return this.form.invalid || this.loadingInProgress;
	}

	get tags() {
		return this.form.get('tags');
	}

	get tagList() {
		return tagData;
	}
}
