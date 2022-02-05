import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Project } from '../../model';
import { rawProjectToProject } from '../utils/raw-project-to-project';
import { IProjectService } from '../interfaces/project.service';
import { ProjectBuilder } from '../../builders/project.builder';

import { projectToFormData } from './utils/project-to-form-data';

@Injectable()
export class RealProjectService implements IProjectService {
	private _id = 100;

  constructor(
    private http: HttpClient,
  ) {}

	get tempId() {
		return `_${this._id++}`;
	}

	deleteProject(id: string, token: string) {
		const url = environment.blogDomain + `/index.php/api/projects/${id}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${token}`,
      })
    };

    return this.http.delete(url, httpOptions);
	}

	createProject(token: string) {
		const project = new ProjectBuilder().id(this.tempId).build();

		return this.updateProject(project, token);
	}

	updateProject(project: Project, token: string) {
		const url = environment.blogDomain + '/index.php/api/projects';

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${token}`,
      })
    };

		const formData = projectToFormData(project);

    return this.http.post<any>(url, formData, httpOptions)
      .pipe(
        map((data) => {
					return rawProjectToProject(data.project);
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status) {
            return throwError({
              status: error.status
            });
          } else {
            return throwError({
              message: 'an error occurred'
            });
          }
        })
      );
	}

	getProjects(token: string): Observable<Array<Project>> {
		const url = environment.blogDomain + '/index.php/api/projects';

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${token}`,
      })
    };

    return this.http.get<any>(url, httpOptions)
      .pipe(
        map((data: any) => {
					const projects = data?.projects || [];
					return projects.map(rawProjectToProject);
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status) {
            return throwError({
              status: error.status
            });
          } else {
            return throwError({
              message: 'an error occurred'
            });
          }
        })
      );
	}
}
