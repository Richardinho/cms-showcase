import {
	Article,
	RawArticle,
} from '../../model';

export const rawArticleToArticle = (rawArticle: RawArticle): Article => {
	const result: any = {};

	result.body = rawArticle.body;
	result.id = rawArticle.id;
	result.published = rawArticle.published;
	result.summary = rawArticle.summary;
	result.title = rawArticle.title;
	result.saved = true;

	const { tag1, tag2, tag3 } = rawArticle;

	result.tags = ['angular', 'css', 'html-5', 'react', 'javascript'].reduce((memo, tag) => {
		return {
			...memo,
			[tag]: (tag === tag1) || (tag === tag2) || (tag === tag3),
		};
	}, {});

	return result as Article;
};
