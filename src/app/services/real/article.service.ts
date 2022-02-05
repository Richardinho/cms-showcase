import { Inject, Injectable } from '@angular/core';

import {
	HttpErrorResponse,
	HttpHeaders,
	HttpClient,
} from '@angular/common/http';

import {
	of,
	Observable,
	throwError,
} from 'rxjs';

import { map, catchError } from 'rxjs/operators';

import {
	Article,
	ArticleLink,
	RawArticle,
} from '../../model';

import { rawArticleToArticleLink } from '../utils/raw-article-to-article-link';
import { rawArticleToArticle } from '../utils/raw-article-to-article';
import { environment } from '../../../environments/environment';

import { articles } from '../data/articles';

import { IArticleService } from '../interfaces/article.service';
import { LOGIN_SERVICE, ILoginService } from '../interfaces/login.service';

import { articleToFormData } from './utils/article-to-form-data';

@Injectable()
export class RealArticleService implements IArticleService {

  constructor(
    private http: HttpClient,
		@Inject(LOGIN_SERVICE) private loginService: ILoginService,
  ) {}

  getArticle(id: string, token: string): Observable<Article> {
    const url = environment.blogDomain + '/index.php/api/article/' + id;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${token}`,
      })
    };

    return this.http.get<RawArticle>(url, httpOptions)
      .pipe(
        map((data) => {
          return rawArticleToArticle(data);
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

  getArticleLinks(token: string): Observable<Array<ArticleLink>> {
    const url = environment.blogDomain + '/index.php/api/articles/';

    return this._get(url, token).pipe(
      map(data => {
        return data.articles.map(rawArticleToArticleLink);
      }),
    );
  }

  createArticle(token: string): Observable<string> {
    const formData = new FormData();

    const url = environment.blogDomain + '/index.php/api/article/';

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${token}`,
        'enctype': 'multipart/form-data'
      })
    };

    return this.http
      .put<any>(url, formData, httpOptions)
      .pipe(map(data => data.id));
  }

  updateArticle(article: Article, token: string): Observable<Article> {
    const url = environment.blogDomain + '/index.php/api/article/' + article.id;
    const formData: FormData = articleToFormData(article);

    return this._post(url, formData, token).pipe(
			map((rawArticle: RawArticle) => rawArticleToArticle(rawArticle)));
  }

  deleteArticle(articleId: string, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${token}`,
        'enctype': 'multipart/form-data'
      })
    };

    const url = environment.blogDomain + `/index.php/api/article/${articleId}`;

    return this.http.delete(url, httpOptions);
  }

  _get(url: string, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${token}`,
      })
    };

    return this.http.get<any>(url, httpOptions);
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
