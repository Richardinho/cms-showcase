import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../model';

export interface IProjectService {

	deleteProject(id: string, token: string): Observable<any>;

	updateProject(project: Project, token: string): Observable<any>;

	getProjects(token:string): Observable<any>;
}

export const PROJECT_SERVICE = new InjectionToken<IProjectService>('project.service');
