import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Article } from '../../model';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../model';
import { introUnsavedChanges, selectIntro } from '../../selectors/intro.selector';

import { introChanged } from '../../actions/intro-changed.action';
import { introRequest } from '../../actions/intro-request.action';
import { saveIntro } from '../../actions/save-intro.action';

@Component({
  templateUrl: './intro-page.component.html',
	styleUrls: ['./intro-page.component.scss'],
})
export class IntroPageComponent {
  intro$: Observable<any>;

	unsavedChanges$: Observable<boolean>;

  fGroup: FormGroup = new FormGroup({
    body: new FormControl('', Validators.required),
  });

  constructor(
    private store: Store<AppState>
  ) {}

	ngOnInit() {

		this.unsavedChanges$ = this.store.pipe(select(introUnsavedChanges));
		//  when form changes, update store (note: updating the server is a different action).
		this.fGroup.valueChanges.subscribe(fg => {
			const metadata = { ...fg, saved: false };
			this.store.dispatch(introChanged(metadata));
		});

		//  when intro in store is updated, update form
		this.intro$ = this.store.pipe(select(selectIntro));
		this.intro$.subscribe(intro => {
			if (intro) {
				this.fGroup.patchValue(intro, { emitEvent: false });
			}
		});

		//  dispatch action to request intro data from server
		this.store.dispatch(introRequest());
	}

	saveEdit() {
		if (this.fGroup.valid) {
			this.store.dispatch(saveIntro());
		}
	}
}
