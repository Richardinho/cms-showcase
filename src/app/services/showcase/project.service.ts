import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { RawProject, Project } from '../../model';
import { projects as rawProjects } from '../data/projects';
import { rawProjectToProject } from '../utils/raw-project-to-project';
import { projectToRawProject } from './utils/project-to-raw-project';
import { IProjectService } from '../interfaces/project.service';
import { ProjectBuilder } from '../../builders/project.builder';

let nextId = 100;

const createNewId = () => {
	nextId++;
	return '' + nextId;
};

@Injectable()
export class ShowcaseProjectService implements IProjectService {

  constructor() {}

	deleteProject(id: string, token: string) {
		delete rawProjects[id];
		return of({}).pipe(delay(4000));
	}

	updateProject(project: Project, token: string) {
		rawProjects[project.id] = projectToRawProject(project);

		return of(project).pipe(delay(2000));
	}

	getProjects(token: string): Observable<Array<Project>> {
		const projects: Array<Project> = rawProjects.map((project: RawProject) => {
			return rawProjectToProject(project);
		});

		return of(projects);
	}

	createProject(token: string) {
		const id = createNewId();

		const rawProject: RawProject = {
			"id": id,
			"title": "sfsf",
			"href": "sfsf",
			"tag1": null,
			"tag2": null,
			"tag3": null,
			"published": "0"
		};

		rawProjects.push(rawProject);
		
		return of(rawProjectToProject(rawProject));
	}
}
