import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Project } from '../model';
import { projects } from './data/projects';

let nextId = 100;

const createNewId = () => {
	nextId++;
	return '' + nextId;
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() {}

	deleteProject(id: string, token: string) {
		return of({}).pipe(delay(4000));
	}

	updateProject(project: Project, token: string) {
		return of({
			...project,
			id: createNewId(),
		}).pipe(
			delay(2000)
		);
	}

	getProjects(token: string): Observable<Array<Project>> {
		// todo: put in delay here
		return of(projects);
	}
}
