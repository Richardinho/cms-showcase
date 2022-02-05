import { Project } from '../../../../model';
import { projectToFormData } from '../project-to-form-data';

describe('projectToFormData', () => {

	const project: Project = {
		id: '3',
		title: 'alpha',
		href: 'www.richardhunter.co.uk',
		published: true,
		tags: {
			angular: true,
			react: false,
			'html-5': true,
			css: false,
			javascript: false,
		},
	};

	it('should construct form data object from project', () => {
		const result = projectToFormData(project);

		expect(result.get('id')).toBe(project.id);
		expect(result.get('title')).toBe(project.title);
		expect(result.get('href')).toBe(project.href);
		expect(result.get('tag1')).toBe('angular');
		expect(result.get('tag2')).toBe('html-5');
		expect(result.get('published')).toBe('true');
	});
});
