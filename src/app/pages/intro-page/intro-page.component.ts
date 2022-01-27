import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { merge, of } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { Article, Intro } from '../../model';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../model';
import { introSavedChanges, selectIntro } from '../../selectors/intro.selector';

import {
	introChanged,
	introRequest,
	saveIntro,
	introStatusChanged,
} from '../../actions/intro-request.action';

@Component({
  templateUrl: './intro-page.component.html',
	styleUrls: ['./intro-page.component.scss'],
})
export class IntroPageComponent {
  intro$: Observable<Intro>;
	showLoader$: Observable<boolean>;
	saveDisabled$: Observable<boolean>;

	body$: Observable<string>;

  fGroup: FormGroup = new FormGroup({
    body: new FormControl('', Validators.required),
  });

  constructor(
    private store: Store<AppState>
  ) {}

	ngOnInit() {

		this.fGroup.valueChanges.subscribe(intro => {
			const metadata = { saved: false, body: intro.body };

			this.store.dispatch(introChanged(metadata));
		});

		const savedChanges$: Observable<boolean> = this.store.pipe(
			select(introSavedChanges),
		);

		this.saveDisabled$ = merge(
			this.fGroup.statusChanges.pipe(
				map(status => status !== 'VALID')
			),
			savedChanges$,
		);

		this.intro$ = this.store.pipe(select(selectIntro));

		this.body$ = this.intro$.pipe(
			map(intro => intro.body),
		);

		this.intro$.subscribe(intro => {
			if (intro) {
				this.fGroup.patchValue(intro, {emitEvent: false});
			}
		});

		this.store.dispatch(introRequest());

	}

	saveEdit() {
		const action = saveIntro();

		this.store.dispatch(action);
	}
}
