import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError, of } from 'rxjs';
import { Intro } from '../model';
import { intro } from './data/intro';

@Injectable({
  providedIn: 'root'
})
export class IntroService {

	saveIntro(action, introWithToken) {
		// all changes are persisted to store, so we don't really need to put them into our fake server
		return of({});
	}

  getIntro(token: string) {
		return of(intro);
  }
}
