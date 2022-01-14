import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Article } from '../../model';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../model';
import { selectIntro } from './selectors/intro.selector';
import { introChanged } from './actions/intro-changed.action';
import { introRequest } from './actions/intro-request.action';
import { saveIntro } from './actions/save-intro.action';

@Component({
  templateUrl: './intro-page.component.html',
	styleUrls: ['./intro-page.component.scss'],
})
export class IntroPageComponent {
  intro$: Observable<any>;
  public fGroup: FormGroup = new FormGroup({
    body: new FormControl('', Validators.required),
  });

  constructor(
    private store: Store<AppState>
  ) {}

	ngOnInit() {
		this.store.dispatch(introRequest());

		this.fGroup.valueChanges.subscribe(fg => {
			this.store.dispatch(introChanged(fg));
		});

		this.intro$ = this.store.pipe(select(selectIntro));
		this.intro$.subscribe(intro => {
			if (intro) {
				this.fGroup.patchValue(intro, { emitEvent: false });
			}
		});
	}

	saveEdit() {
		if (this.fGroup.valid) {
			this.store.dispatch(saveIntro());
		}
	}
}
