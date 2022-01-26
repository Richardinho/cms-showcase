import {
	Article,
	RawArticle,
	ArticleLink,
} from '../../model';

export const articleToRawArticle = (article: Article, rawArticle: RawArticle): RawArticle => {

	const result: any = {};

	result.body = article.body;
	result.id = article.id;
	result.published = article.published;
	result.summary = article.summary;
	result.tag1 = article.tag1;
	result.tag2 = article.tag2;
	result.tag3 = article.tag3;
	result.title = article.title;

	result.date_created = rawArticle.date_created;
	result.date_edited = rawArticle.date_edited;
	result.author = rawArticle.author;

	return result as RawArticle;
};

export const rawArticleToArticle = (rawArticle: RawArticle): Article => {
	const result: any = {};

	result.body = rawArticle.body;
	result.id = rawArticle.id;
	result.published = rawArticle.published;
	result.summary = rawArticle.summary;
	result.tag1 = rawArticle.tag1;
	result.tag2 = rawArticle.tag2;
	result.tag3 = rawArticle.tag3;
	result.title = rawArticle.title;

	return result as Article;
};

export const rawArticleToArticleLink = (rawArticle: RawArticle): ArticleLink => {
	const result: any = {};

	result.id = rawArticle.id;
	result.published = rawArticle.published;
	result.title = rawArticle.title;

	return result as ArticleLink;
};
