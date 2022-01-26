import { Injectable } from '@angular/core';
import { throwError, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Intro, RawIntro } from '../model';
import { intro } from './data/intro';
import { rawIntroToIntro } from './utils/raw-intro-to-intro';


@Injectable({
  providedIn: 'root'
})
export class IntroService {

	saveIntro(action, introWithToken) {
		// all changes are persisted to store, so we don't really need to put them into our fake server
		return of({}).pipe(delay(2000));
	}

  getIntro(token: string): Observable<Intro> {
		return of(rawIntroToIntro(intro));
  }
}
