import { Observable } from 'rxjs';
import { Intro } from '../../model';
import { InjectionToken } from '@angular/core';

export interface IIntroService {

	saveIntro(intro: Intro, token: string): Observable<any>;

	getIntro(token: string): Observable<any>;
}

export const INTRO_SERVICE = new InjectionToken<IIntroService>('intro.service');
