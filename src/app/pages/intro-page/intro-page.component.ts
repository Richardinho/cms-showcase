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
import { JWTToken } from '../../selectors/jwt-token.selector';
import { INTRO_SERVICE, IIntroService } from '../../services/interfaces/intro.service';
import { ERROR, INFO, MessageService } from '../../services/message.service';

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
		private messageService: MessageService,
		@Inject(INTRO_SERVICE) private introService: IIntroService,
  ) {}

	ngOnInit() {
		this.form = new FormGroup({
			body: new FormControl('', Validators.required),
		});

		this.store.pipe(
			select(JWTToken),
			mergeMap(token => this.introService.getIntro(token)),
		).subscribe({
				next: (intro) => {
					this.form.patchValue(intro);
				},

				error: () => {
					this.messageService.show('An error occurred. Please check your network', ERROR);

				},
			});

		this.intro$ = this.form.valueChanges;
	}


	update() {
		return () => {
			this.loadingInProgress = true;

			this.store.pipe(
				select(JWTToken),
				mergeMap(token => this.introService.saveIntro(this.form.value, token)),
			).subscribe({
					next: () => {
						this.loadingInProgress = false;
						this.form.markAsPristine();
						this.messageService.show('Changes saved to server', INFO);
					},
					error: (err) => {
						this.loadingInProgress = false;
						this.messageService.show('An error occurred', ERROR);
					},
				});
		}
	}

	get disabled() {
		return this.form.pristine || this.form.invalid || this.loadingInProgress;
	}
}
