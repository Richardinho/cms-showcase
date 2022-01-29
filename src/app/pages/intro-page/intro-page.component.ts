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
import { selectIntro } from '../../selectors/intro.selector';
import { selectLoadingTokens } from '../../selectors/ui.selector';

import {
	putIntroIntoStore,
	introRequest,
	saveIntroRequest,
	introStatusChanged,
} from '../../actions/intro-request.action';

@Component({
  templateUrl: './intro-page.component.html',
	styleUrls: ['./intro-page.component.scss'],
})
export class IntroPageComponent {
  intro$: Observable<Intro>;
	showLoader$: Observable<boolean>;
	disabled$: Observable<boolean>;
	form: FormGroup;

  constructor(
    private store: Store<AppState>
  ) {}

	ngOnInit() {

		this.form = new FormGroup({
			body: new FormControl('', Validators.required),
		});

		/*
		 *  when form data changes, put this into store
		 */ 

		this.form.valueChanges.subscribe(intro => {
			const metadata = {
				body: intro.body,
			};

			const action = putIntroIntoStore(metadata);

			this.store.dispatch(action);
		});

		this.showLoader$ = this.store.pipe(
			select(selectLoadingTokens),
			map((loadingTokens: Array<string>) => loadingTokens.includes('__intro_body__')),
			startWith(false),
		);

		/*
		 *  get intro from store
		 */

		this.intro$ = this.store.pipe(select(selectIntro));

		/*
		 *  when data in store changes, put this data into form
		 */

		this.intro$.subscribe(intro => {
			if (intro) {
				this.form.patchValue(intro, { emitEvent: false });
			}
		});


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

		const noLocalChanges$ = this.intro$.pipe(
			map(data => data.saved),
		);

		this.disabled$ = combineLatest(
			this.showLoader$,
			formInvalid$,
			noLocalChanges$,
		).pipe(
			map(([
				loading,
				formInvalid,
				noLocalChanges
			]) => {
				return loading || formInvalid || noLocalChanges; 
			}),
		);

		/*
		 *  dispatch request to fetch data from store
		 */

		this.store.dispatch(introRequest());
	}

	update() {
		return () => {
			const metadata = {
				loadingToken: '__intro_body__',
			};

			const action = saveIntroRequest(metadata);

			this.store.dispatch(action);
		}
	}
}
