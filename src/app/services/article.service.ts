import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import {
	Article,
	ArticleLink,
	RawArticle,
	EditArticleView,
} from '../model';

import { environment } from '../../environments/environment';

import {
	rawArticleToArticleLink,
	rawArticleToArticle,
	articleToRawArticle,
} from './utils/article-to-form-data';

import { articles } from './data/articles';

// todo: this should probably live in store? For example, I should be able to
// configure this within the CMS: add, remove tags etc.
export const tagData: string[] = [ 'angular', 'css', 'html-5', 'javascript', 'react' ];


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

	nextId = 100;

  tagData: string[] = tagData;

  constructor() {}

  getArticle(id: string, token: string): Observable<Article> {
		const rawArticle: RawArticle = articles.find((article) => {
			return article.id === id;
		});

		const article: Article = rawArticleToArticle(rawArticle);

		return of(article);
  }

  getArticleLinks(token: string): Observable<Array<ArticleLink>> {

		const links: Array<ArticleLink> = articles.map((rawArticle: RawArticle) => {
			return rawArticleToArticleLink(rawArticle);
		});

		return of(links);
  }

  createArticle(token: any) {
		const id = "" + (++this.nextId);

		articles.push({
			"id": id,
			"title": "babababa black sheep",
			"date_created": "Nov 28 2020",
			"date_edited": "",
			"body": "sfsf",
			"author": "Richard",
			"summary": "",
			"tag1": null,
			"tag2": null,
			"tag3": null,
			"published": false
		});

		return of(id);
  }

  updateArticle(article: Article, token: string) {
		const index = articles.findIndex(item => {
			return article.id === item.id;
		});

		articles[index] = articleToRawArticle(article, articles[index]);

		return of({
			message: 'article saved',
		});
  }

  deleteArticle(articleId: any, token: any) {
		const indexOfArticle = articles.findIndex(article => {
			return article.id === articleId;
		});

		articles.splice(indexOfArticle, 1);

		return of({});
  }

  publish(articleId: any, publish: any, token:any) {
		console.log('publish', articleId, publish);
		const indexOfArticle = articles.findIndex(article => {
			return article.id === articleId;
		});
		console.log(indexOfArticle);

		articles[indexOfArticle].published = publish;

		return of({ id: articleId, published: publish });
  }
}
