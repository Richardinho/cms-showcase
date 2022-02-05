import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../model';
import { HttpClient } from '@angular/common/http';

import { logInRequest } from '../../actions/log-in.action';

interface LoginResponseData {
  jwt_token: string;
}

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  public username = '';
  public password = '';

  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    ) {}

  ngOnInit() {
    //this.authService.logOut();
  }

  onSubmit() {
    const redirectUrl = this.route.snapshot.queryParamMap.get('afterLogin') || '/';

    this.store.dispatch(logInRequest({
      redirectUrl,
      username: this.username,
      password: this.password }));
  }
}
