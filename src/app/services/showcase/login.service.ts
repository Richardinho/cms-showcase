import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ILoginService, LoginResponseData } from '../interfaces/login.service';


@Injectable()
export class ShowcaseLoginService implements ILoginService {

  constructor( private http: HttpClient) {}

	getToken() {
		return 'fake_token';
	}

	logIn(username: string, password: string) {
		if (password === 'password') {

			return of({
				jwt_token: 'fake_token',
			});

		} else {

			return throwError({
				message: 'your password was wrong. Try "password"',
				status: 401,
			});
		}
	}
}
