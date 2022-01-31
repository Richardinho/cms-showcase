import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

import {
	Article,
	ArticleLink,
	RawArticle,
	EditArticleView,
} from '../model';

import { rawArticleToArticleLink } from './utils/raw-article-to-article-link';
import { articleToRawArticle } from './utils/article-to-raw-article';
import { rawArticleToArticle } from './utils/raw-article-to-article';
import { createRawArticle } from './utils/create-raw-article';

import { articles } from './data/articles';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

	nextId = 100;

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

  deleteArticle(articleId: string, token: any) {
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
}
