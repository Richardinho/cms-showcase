import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
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

	updateArticle(article: Article, token: string): Observable<Article>;

	deleteArticle(articleId: string, token: string): Observable<any>;

}


export const ARTICLE_SERVICE = new InjectionToken<IArticleService>('article.service'); 

