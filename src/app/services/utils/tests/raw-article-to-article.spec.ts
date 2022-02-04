import {
	Article,
	RawArticle,
} from '../../../model';
import { rawArticleToArticle } from '../raw-article-to-article';

describe('rawArticleToArticle()', () => {
	const rawArticle: RawArticle = {
		"id": "26",
		"title": "test article",
		"date_created": "Nov 28 2020",
		"date_edited": "Jan 10 2022",
		"body": "blah",
		"author": "Richard",
		"summary": "test summary",
		"tag1": 'angular',
		"tag2": 'react',
		"tag3": null,
		"published": false
	};

	const article: Article = {
		id: '26',
		title: 'test article',
		body: 'blah',
		summary: 'test summary',
		published: false,
		tags: {
			angular: true,
			react: true,
			css: false,
			'html-5': false,
			javascript: false,
		},
		saved: true,
	};

	it('should convert raw article to article', () => {
		expect(rawArticleToArticle(rawArticle)).toEqual(article);
	});
});
