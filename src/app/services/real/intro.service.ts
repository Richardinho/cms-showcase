import { Injectable } from '@angular/core';
import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
} from '@angular/common/http';

import {
	Observable,
	of,
	throwError,
} from 'rxjs';

import { map, catchError } from 'rxjs/operators';

import { Intro } from '../../model';
import { environment } from '../../../environments/environment';
import { IIntroService } from '../interfaces/intro.service';

const introToFormData = (intro: Intro) => {
	const formData = new FormData();
	formData.append('intro_text', intro.body);
	return formData;
};

@Injectable()
export class RealIntroService implements IIntroService {

  constructor(
    private http: HttpClient,
  ) {}

  getIntro(token: string) {
    const url = environment.blogDomain + '/index.php/api/intro';

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${token}`,
      })
    };

    return this.http.get<any>(url, httpOptions)
      .pipe(
        map((data) => {
					return {
						body: data.intro_text,
					};
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

	saveIntro(intro: Intro, token: string) {
    const url = environment.blogDomain + '/index.php/api/intro';
    const formData: FormData = introToFormData(intro);

    return this._post(url, formData, token);
	}

  _post(url: any, formData: any, token: any) {

    if (!token) {

      return throwError({
        message: 'You are not logged in. No JWT token in localStorage',
        status: 401,
      });

    } else {

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Basic ${token}`,
          'enctype': 'multipart/form-data'
        })
      };

      return this.http.post<any>(url, formData, httpOptions).pipe(
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

}
