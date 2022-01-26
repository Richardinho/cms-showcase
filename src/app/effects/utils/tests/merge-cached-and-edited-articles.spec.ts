import { mergeCachedAndEditedArticles } from '../merge-cached-and-edited-articles';
import { Article, EditArticleView } from '../../../model';


describe('mergeCachedAndEditedArticles()', () => {
	const cachedArticle: Article = {
		id: '3',
		title: 'alpha',
		body: 'hello world',
		summary: 'hel',
		published: false,
		tag1: 'angular',
		tag2: 'javascript',
		tag3: null,
	};

	const editedArticles: EditArticleView = {

		id: '3',
		title: 'beta',
		body: 'goodbye world',
		summary: 'good',
		tags: {
			'angular': false,
			'react': true,
			'html-5': false,
			'javascript': true,
			'css': false,
		}
	};

	it('should create article with changes merged from edited article', () => {
		expect(mergeCachedAndEditedArticles(cachedArticle, editedArticles)).toEqual({
			id: '3',
			title: 'beta',
			body: 'goodbye world',
			summary: 'good',
			published: false,
			tag1: 'javascript',
			tag2: 'react',
			tag3: null,
		});
	});
});
