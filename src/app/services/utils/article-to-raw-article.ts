import {
	Article,
	RawArticle,
} from '../../model';

export const articleToRawArticle = (article: Article): RawArticle => {

	const result: any = {};

	result.body = article.body;
	result.id = article.id;
	result.published = article.published;
	result.summary = article.summary;

	const [tag1 = null, tag2 = null, tag3 = null] = Object.keys(article.tags)
		.sort()
		.reduce((memo, key) => {
			if (article.tags[key]) {
				return [
					...memo,
					key,
				];
			}

			return memo;
		}, []);

	result.tag1 = tag1;
	result.tag2 = tag2;
	result.tag3 = tag3;

	result.title = article.title;

	result.date_created = '';
	result.date_edited = '';
	result.author = '';

	return result as RawArticle;
};


