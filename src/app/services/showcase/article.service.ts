import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

import {
	Article,
	ArticleLink,
	RawArticle,
	EditArticleView,
} from '../../model';

import { rawArticleToArticleLink } from '../utils/raw-article-to-article-link';
import { articleToRawArticle } from './utils/article-to-raw-article';
import { rawArticleToArticle } from '../utils/raw-article-to-article';
import { createRawArticle } from './utils/create-raw-article';

import { articles } from '../data/articles';

import { IArticleService } from '../interfaces/article.service';

@Injectable()
export class ShowcaseArticleService implements IArticleService {

	nextId = 100;

  constructor() {}

  getArticle(id: string, token: string): Observable<Article> {
		const rawArticle: RawArticle = articles.find((article) => {
			return article.id === id;
		});

		const article: Article = rawArticleToArticle(rawArticle);

		// delay is added to make this asynchronous.
		// Otherwise, edit article page doesn't render after form is patched
		// with data TODO: investigate this
		return of(article).pipe(delay(2));
  }

  getArticleLinks(token: string): Observable<Array<ArticleLink>> {

		const links: Array<ArticleLink> = articles.map((rawArticle: RawArticle) => {
			return rawArticleToArticleLink(rawArticle);
		});

		return of(links);
  }

  createArticle(token: string): Observable<string> {
		const id = "" + (++this.nextId);

		articles.push(createRawArticle(id));

		return of(id);
  }

  updateArticle(article: Article, token: string): Observable<Article> {
		const index = articles.findIndex(item => {
			return article.id === item.id;
		});

		articles[index] = articleToRawArticle(article);

		return of(article).pipe(delay(3000))
  }

  deleteArticle(articleId: string, token: string) {
		const indexOfArticle = articles.findIndex(article => {
			return article.id === articleId;
		});

		articles.splice(indexOfArticle, 1);

		return of({});
  }
}
