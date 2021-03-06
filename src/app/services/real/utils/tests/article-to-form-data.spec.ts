import { Article } from '../../../../model';
import { articleToFormData } from '../article-to-form-data';

describe('articleToFormData()', () => {

	const article: Article = {
		id: '23',
		title: 'alpha',
		body: 'blah blah',
		summary: 'alpha summary',
		published: true,
		tags: {
			'angular': false,
			'css': true,
			'javascript': true,
			'html-5': false,
			'react': false,
		},
		saved: false,
	};

	it('should construct form data object from article', () => {
		const result = articleToFormData(article);

		expect(result.get('id')).toBe(article.id);
		expect(result.get('title')).toBe(article.title);
		expect(result.get('body')).toBe(article.body);
		expect(result.get('summary')).toBe(article.summary);
		expect(result.get('published')).toBe('true');
		expect(result.get('tag1')).toBe('css');
		expect(result.get('tag2')).toBe('javascript');
	});
});
