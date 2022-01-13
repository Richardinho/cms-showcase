import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Intro } from '../model';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const introToFormData = (intro) => {
	const formData = new FormData();
	formData.append('intro_text', intro);
	return formData;
};

@Injectable({
  providedIn: 'root'
})
export class IntroService {

  constructor(
    private http: HttpClient,
  ) {}

	saveIntro(action, introWithToken) {
		const intro = introWithToken.intro.body;
		const token = introWithToken.jwt;
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
          return data;
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
