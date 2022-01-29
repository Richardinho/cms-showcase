import {
	Article,
	RawArticle,
	ArticleLink,
} from '../../model';

export const rawArticleToArticleLink = (rawArticle: RawArticle): ArticleLink => {
	const result: any = {};

	result.id = rawArticle.id;
	result.published = rawArticle.published;
	result.title = rawArticle.title;

	return result as ArticleLink;
};
