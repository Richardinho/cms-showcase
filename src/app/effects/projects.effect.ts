import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, withLatestFrom, switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
	projectsRequest,
	projectsFoundInCache,
	projectsResponse,
} from '../actions/projects.action';
import { unauthorisedResponse } from '../actions/unauthorised-response.action';
import { genericError } from '../actions/generic-error.action';

import { selectProjectsWithJWTToken } from '../selectors/project.selector';
import { AppState } from '../model';
import { ProjectService } from '../services/projects.service';
import { UNAUTHORIZED } from '../status-code.constants';

@Injectable()
export class ProjectsEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
		private projectService: ProjectService,
  ) {}

	getProjects$ = createEffect(() => 
		this.actions$.pipe(
			ofType(projectsRequest),
			// if we're on this page, the token must exist.
			// Should we handle the case where it doesn't exist?
			withLatestFrom(this.store.pipe(select(selectProjectsWithJWTToken))),
			switchMap(([action, {token, projects}]) => {
				if (projects && projects.length) {
					// projects are already in store. Just signal this.
					return of(projectsFoundInCache());
				} else {
				 return this.projectService.getProjects(token)
					 .pipe(
							map(projectsJSON => {
								return projectsResponse({ projectsJSON });
							}),
							catchError((error) => {
								if (error.status) {
									if (error.status === UNAUTHORIZED) {
										return of(genericError({ message: 'Server error occured' }));
									} else {
										return of(genericError({ message: 'Server error occured' }));
									}
								} else {
									return of(genericError({ message: 'check your network' }));
								}
							}),
				 );
				}
			}),
		));
}
