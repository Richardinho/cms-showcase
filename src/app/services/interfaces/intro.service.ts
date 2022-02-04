import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export interface IIntroService {

	saveIntro(introWithToken: any): Observable<any>;

	getIntro(token: string): Observable<any>;
}

export const INTRO_SERVICE = new InjectionToken<IIntroService>('intro.service');
