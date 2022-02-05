import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Intro } from '../../model';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../model';
import { selectJWTToken } from '../../selectors/article.selector';
import { INTRO_SERVICE, IIntroService } from '../../services/interfaces/intro.service';

@Component({
  templateUrl: './intro-page.component.html',
	styleUrls: ['./intro-page.component.scss'],
})
export class IntroPageComponent {
	intro$: Observable<Intro>;
	loadingInProgress: boolean;
	form: FormGroup;

  constructor(
    private store: Store<AppState>,
		@Inject(INTRO_SERVICE) private introService: IIntroService,
  ) {}

	ngOnInit() {
		this.form = new FormGroup({
			body: new FormControl('', Validators.required),
		});

		this.store.pipe(
			select(selectJWTToken),
			mergeMap(token => this.introService.getIntro(token)),
		).subscribe(intro => {
				this.form.patchValue(intro);
			});

		this.intro$ = this.form.valueChanges;
	}


	update() {
		return () => {
			this.loadingInProgress = true;

			this.store.pipe(
				select(selectJWTToken),
				mergeMap(token => this.introService.saveIntro(this.form.value, token)),
			).subscribe(() => {
					this.loadingInProgress = false;
					this.form.markAsPristine();
				});
		}
	}

	get disabled() {
		return this.form.pristine || this.form.invalid || this.loadingInProgress;
	}
}
