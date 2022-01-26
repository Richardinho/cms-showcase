import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
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
		return of({});
	}

	updateProject(project: Project, token: string) {
		return of({
			...project,
			id: createNewId(),
		});
	}

	getProjects(token: string): Observable<Array<Project>> {
		return of(projects);
	}
}
