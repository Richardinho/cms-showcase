import {
	Inject,
	Injectable,
} from '@angular/core';

import { of } from 'rxjs';

import {
	Actions,
	createEffect,
	ofType,
} from '@ngrx/effects';

import { Store, select } from '@ngrx/store';

import {
	catchError,
	concatMap,
	map,
	switchMap,
	withLatestFrom,
} from 'rxjs/operators';

import { AppState } from '../model';

import {
	METADATA_SERVICE,
	IMetadataService,
} from '../services/interfaces/metadata.service';

import { genericError } from '../actions/generic-error.action';
import { unauthorisedResponse } from '../actions/unauthorised-response.action';

import {
	updateMetadataRequest,
	updateMetadataResponse,
} from '../actions/update-metadata.action';

import {selectJWTToken} from '../selectors/article.selector';
import { UNAUTHORIZED } from '../status-code.constants';

@Injectable()
export class PutMetadataEffect {
  constructor(
    private actions$: Actions,
    @Inject(METADATA_SERVICE) private metadataService: IMetadataService,
    private store: Store<AppState>,
  ) {}

  putMetadata$ = createEffect(() =>  

    this.actions$.pipe(
      ofType(updateMetadataRequest),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(selectJWTToken)))
      )),
      switchMap(([action, token]) => {
        return this.metadataService.putMetadata(token, action.metadata).pipe(
          map((metadata: any) => updateMetadataResponse({ metadata, loadingToken: action.loadingToken })),
          catchError((error) => {
            if (error.status) {
              if (error.status === UNAUTHORIZED) {
                return of(unauthorisedResponse({ redirectUrl: '/' }));
              } else {
                return of(genericError({ message: 'Server error occurred' }));
              }
            } else {
              return of(genericError({ message: 'Server error occurred' }));
            }
          })
        );
      })
    ));
}
