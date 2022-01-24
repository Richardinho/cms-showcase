import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Project } from '../model';
import { transformDataToProjects } from './utils/transform-data-to-projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient,
  ) {}

	deleteProject(id: string, token: string) {
		const url = environment.blogDomain + `/index.php/api/projects/${id}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${token}`,
      })
    };

    return this.http.delete(url, httpOptions);
	}

	updateProject(project: any, token: string) {
		const url = environment.blogDomain + '/index.php/api/projects';

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${token}`,
      })
    };

		const formData = new FormData();

		const { id, title, href, tag1, tag2, tag3, published } = project;

		formData.append('title', title);
		formData.append('href', href);
		formData.append('tag1', tag1 || '');
		formData.append('tag2', tag2 || '');
		formData.append('tag3', tag3 || '');
		formData.append('id', id);
		formData.append('published', published);

    return this.http.post<any>(url, formData, httpOptions)
      .pipe(
        map((data) => {
					return data.project;
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
					return transformDataToProjects(data?.projects || []);
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
