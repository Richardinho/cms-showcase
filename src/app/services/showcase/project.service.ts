import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { RawProject, Project } from '../../model';
import { projects as rawProjects } from '../data/projects';
import { rawProjectToProject } from '../utils/raw-project-to-project';
import { IProjectService } from '../interfaces/project.service';

let nextId = 100;

const createNewId = () => {
	nextId++;
	return '' + nextId;
};

@Injectable()
export class ShowcaseProjectService implements IProjectService {

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
		const projects: Array<Project> = rawProjects.map((project: RawProject) => {
			return rawProjectToProject(project);
		});

		return of(projects);
	}
}
