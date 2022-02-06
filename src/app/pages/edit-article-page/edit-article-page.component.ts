import { Inject, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {
	first,
	map,
	mergeMap,
	startWith,
	withLatestFrom,
} from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { ARTICLE_SERVICE, IArticleService } from '../../services/interfaces/article.service';
import { ERROR, INFO, MessageService } from '../../services/message.service';

import { AppState, Article } from '../../model';

import { JWTToken } from '../../selectors/jwt-token.selector';

import { articleToFormGroup } from './utils/article-to-form-group';
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
		private messageService: MessageService,
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
		).subscribe({
				next: (article: Article) => {
					const formGroup = articleToFormGroup(article);
					this.form.patchValue(formGroup);
				},
				error: (err) => {
					this.messageService.show('An error occurred. Please check your network', ERROR);
				},
			});
  }

  update() {
		return () => {
			this.loadingInProgress = true;

			this.store.pipe(select(JWTToken)).pipe(
				mergeMap((token) => this.articleService.updateArticle(this.form.value, token)),
			).subscribe({
					next: (article) => {
						this.loadingInProgress = false;
						this.form.markAsPristine();
						this.messageService.show('Changes saved to server', INFO);
					},
					error: (err) => {
						this.loadingInProgress = false;
						this.messageService.show('An error occurred', ERROR);
					},
				}
			);
		}
  }

	get updateButtonDisabled() {
		return this.form.pristine || this.form.invalid || this.loadingInProgress;
	}

	get tags() {
		return this.form.get('tags');
	}

	get tagList() {
		return tagData;
	}
}
