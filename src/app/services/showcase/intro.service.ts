import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Intro } from '../../model';
import { intro } from '../data/intro';
import { rawIntroToIntro } from './utils/raw-intro-to-intro';
import { IIntroService } from '../interfaces/intro.service';


@Injectable()
export class ShowcaseIntroService implements IIntroService {

	saveIntro(introWithToken: any) {
		// all changes are persisted to store, so we don't really need to put them into our fake server
		return of({}).pipe(delay(2000));
	}

  getIntro(token: string): Observable<Intro> {
		return of(rawIntroToIntro(intro));
  }
}
