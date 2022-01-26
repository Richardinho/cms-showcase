import { Injectable } from '@angular/core';
import { throwError, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface LoginResponseData {
  jwt_token: string;
}

@Injectable()
export class AuthorisationService {

  constructor(
    private http: HttpClient) {}

  logIn(username: any, password: any) {
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
