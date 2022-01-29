import {
	Article,
	RawArticle,
} from '../../../model';
import { articleToRawArticle } from '../article-to-raw-article';

describe('articleToRawArticle()', () => {
	const rawArticle: RawArticle = {
		"id": "26",
		"title": "test article",
		"date_created": "",
		"date_edited": "",
		"body": "blah",
		"author": "",
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

	it('should convert article to raw article', () => {
		expect(articleToRawArticle(article)).toEqual(rawArticle);
	});
});
