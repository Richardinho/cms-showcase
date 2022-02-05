import { Component, OnInit } from '@angular/core';

import { AppState } from './model';
import { loggedIn } from './selectors/logged-in.selector';
import { Store, select } from '@ngrx/store';
import { logOut } from './actions/log-in.action';

import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cms';
  loggedIn$: any;

  constructor(private store: Store<AppState>) {}
	
  ngOnInit() {
    this.loggedIn$ = this.store.select(loggedIn);
  }

	logOut() {
    this.store.dispatch(logOut());
	}
}
