import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export interface LoginResponseData {
	jwt_token: string;
}

export interface ILoginService {
	logIn(username: string, password: string): Observable<LoginResponseData>;
}

export const LOGIN_SERVICE =  new InjectionToken<ILoginService>('login.service');
