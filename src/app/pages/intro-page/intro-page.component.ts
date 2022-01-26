import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article, Intro } from '../../model';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../model';
import { introSavedChanges, selectIntro } from '../../selectors/intro.selector';
import { selectShowLoader } from '../../selectors/show-loader.selector';

import {
	introChanged,
	introRequest,
	saveIntro,
} from '../../actions/intro-request.action';

@Component({
  templateUrl: './intro-page.component.html',
	styleUrls: ['./intro-page.component.scss'],
})
export class IntroPageComponent {
  intro$: Observable<Intro>;
	showLoader$: Observable<boolean>;
	disableSaveButton$: Observable<boolean>;

  fGroup: FormGroup = new FormGroup({
    body: new FormControl('', Validators.required),
  });

  constructor(
    private store: Store<AppState>
  ) {}

	ngOnInit() {
    this.showLoader$ = this.store.pipe(select(selectShowLoader));

		const savedChanges$: Observable<boolean> = this.store.pipe(
			select(introSavedChanges),
		);

		this.disableSaveButton$ = combineLatest(savedChanges$, this.fGroup.statusChanges).pipe(
			map(([savedChanges, status]) => {
				return savedChanges || status === 'INVALID';
			})
		); 

		this.fGroup.valueChanges.subscribe(fg => {
			const metadata = { ...fg, saved: false };
			this.store.dispatch(introChanged(metadata));
		});

		this.intro$ = this.store.pipe(select(selectIntro));
		this.intro$.subscribe(intro => {
			if (intro) {
				this.fGroup.patchValue(intro, { emitEvent: false });
			}
		});

		this.store.dispatch(introRequest());
	}

	saveEdit() {
		if (this.fGroup.valid) {
			this.store.dispatch(saveIntro());
		}
	}
}
