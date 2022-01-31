import { Injectable } from '@angular/core';
import { throwError, of } from 'rxjs';

interface LoginResponseData {
	jwt_token: string;
}

@Injectable()
export class AuthorisationService {

	constructor() {}

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
