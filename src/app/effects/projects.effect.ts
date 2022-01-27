import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
	tap,
	withLatestFrom,
	mergeMap,
	switchMap,
	map,
	catchError
} from 'rxjs/operators';

import { of } from 'rxjs';

import {
	projectsFoundInCache,

	getProjectsRequest,
	getProjectsResponse,

	saveProjectRequest,
	saveProjectResponse,

	saveNewProjectRequest,
	saveNewProjectResponse,

	deleteProjectRequest,
	deleteProjectResponse,

} from '../actions/projects.action';

import { unauthorisedResponse } from '../actions/unauthorised-response.action';
import { genericError } from '../actions/generic-error.action';

import { selectProjectsWithJWTToken } from '../selectors/project.selector';
import { AppState, Project } from '../model';
import { ProjectService } from '../services/projects.service';
import { UNAUTHORIZED } from '../status-code.constants';

const selectJWTToken = (state: AppState) => state.jwt_token;

@Injectable()
export class ProjectsEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
		private projectService: ProjectService,
  ) {}

	getProjects$ = createEffect(() => 
		this.actions$.pipe(
			ofType(getProjectsRequest),
			withLatestFrom(this.store.pipe(select(selectProjectsWithJWTToken))),
			switchMap(([action, {token, projects}]) => {
				if (projects && projects.length) {
					return of(projectsFoundInCache());
				} else {
				 return this.projectService.getProjects(token)
					 .pipe(
							map((projects: Array<Project>) => {
								return getProjectsResponse({ projects });
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

	saveProject$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(saveProjectRequest),
			withLatestFrom(this.store.pipe(select(selectJWTToken))),
			mergeMap(([action, token]) => {
				return this.projectService.updateProject(action.project, token)
					.pipe(
						map(() => saveProjectResponse({
							loadingToken: action.loadingToken,
							id: action.project.id,
						})),
            catchError((error) => {
							console.log('error occurred', error);
							return of(genericError({ message: 'generic error occurred' }));
            })
					);
			}),
		);
	});

	saveNewProject$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(saveNewProjectRequest),
			withLatestFrom(this.store.pipe(select(selectJWTToken))),
			switchMap(([action, token]) => {
				return this.projectService.updateProject(action.project, token)
				.pipe(
					map((project: Project) => saveNewProjectResponse({
						project,
						loadingToken: action.loadingToken,
						currentId: action.project.id
					})),
					catchError((error) => {
						return of(genericError({ message: 'generic error occurred' }));
					})
				);
			}),
		);
	});

	deleteProject$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(deleteProjectRequest),
			withLatestFrom(this.store.pipe(select(selectJWTToken))),
			mergeMap(([action, token]) => {
				return this.projectService.deleteProject(action.id, token)
					.pipe(
						map(() => deleteProjectResponse({
							loadingToken: action.loadingToken,
						  id: action.id,
						})),
            catchError((error) => {
							return of(genericError({ message: 'generic error occurred' }));
            })
					);
			}),
		);
	});
}
