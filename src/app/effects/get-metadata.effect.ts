import {
	Inject, 
	Injectable,
} from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, catchError, concatMap, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../model';

import { genericError } from '../actions/generic-error.action';
import { metadataRequest, metadataResponse } from '../actions/metadata.action';
import { unauthorisedResponse } from '../actions/unauthorised-response.action';

import {
	IMetadataService,
	METADATA_SERVICE,
} from '../services/interfaces/metadata.service';

import { selectJWTToken } from '../selectors/article.selector';
import { UNAUTHORIZED } from '../status-code.constants';

@Injectable()
export class GetMetadataEffect {
  constructor(
    private actions$: Actions,
    @Inject(METADATA_SERVICE) private metadataService: IMetadataService,
    private store: Store<AppState>,
  ) {}

  getMetadata$ = createEffect(() => 

    this.actions$.pipe(
      ofType(metadataRequest),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(selectJWTToken)))
      )),
      switchMap(([action, token]) => {
        return this.metadataService.getMetadata(token).pipe(
          map((metadata: any) => metadataResponse({ metadata: metadata })),
          catchError((error) => {
            if (error.status) {
              if (error.status === UNAUTHORIZED) {
                return of(unauthorisedResponse({ redirectUrl: '/' }));
              } else {
                return of(genericError({ message: 'Server error occurred' }));
              }
            } else {
              return of(genericError({ message: "some generic error happened"}));
            }
          })
        )
      })
    ));
}
