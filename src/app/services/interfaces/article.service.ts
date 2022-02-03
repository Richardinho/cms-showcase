import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
	Article,
	ArticleLink,
	EditArticleView,
	RawArticle,
} from '../../model';

export interface IArticleService {
	getArticle(id: string, token: string): Observable<Article>;

	getArticleLinks(token: string): Observable<Array<ArticleLink>>;

	createArticle(token: string): Observable<string>;

	updateArticle(article: Article, token: string): Observable<any>;

	deleteArticle(articleId: string, token: string): Observable<any>;

	publishArticle(articleId: string, publish: boolean, token: string): Observable<any>;

}

