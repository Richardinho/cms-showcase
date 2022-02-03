import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

import {
	Article,
	ArticleLink,
	RawArticle,
	EditArticleView,
} from '../../model';

import { rawArticleToArticleLink } from '../utils/raw-article-to-article-link';
import { articleToRawArticle } from '../utils/article-to-raw-article';
import { rawArticleToArticle } from '../utils/raw-article-to-article';
import { createRawArticle } from '../utils/create-raw-article';
import { environment } from '../../../environments/environment';

import { articles } from '../data/articles';

import { IArticleService } from '../interfaces/article.service';

@Injectable()
export class RealArticleService implements IArticleService {

	nextId = 100;

  constructor(
    private http: HttpClient,
  ) {}

  getArticle(id: string, token: string): Observable<Article> {
		const rawArticle: RawArticle = articles.find((article) => {
			return article.id === id;
		});

		const article: Article = rawArticleToArticle(rawArticle);

		return of(article);
  }

  getArticleLinks(token: string): Observable<Array<ArticleLink>> {
		console.log('this is real service');

    const url = environment.blogDomain + '/index.php/api/articles/';

    return this._get(url, token).pipe(
      map(data => {
        return data.articles.map(rawArticleToArticleLink);
      }),
    );
  }

  createArticle(token: string) {
		const id = "" + (++this.nextId);

		articles.push(createRawArticle(id));

		return of(id);
  }

  updateArticle(article: Article, token: string) {
		const index = articles.findIndex(item => {
			return article.id === item.id;
		});

		articles[index] = articleToRawArticle(article);

		return of({
			message: 'article saved',
		}).pipe(delay(4000));
  }

  deleteArticle(articleId: string, token: string) {
		const indexOfArticle = articles.findIndex(article => {
			return article.id === articleId;
		});

		articles.splice(indexOfArticle, 1);

		return of({});
  }

  publishArticle(articleId: string, publish: boolean, token:string) {
		const indexOfArticle = articles.findIndex(article => {
			return article.id === articleId;
		});

		articles[indexOfArticle].published = publish;

		return of({ id: articleId, published: publish });
  }

  _get(url: string, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${token}`,
      })
    };

    return this.http.get<any>(url, httpOptions);
  }
}
