import { RawProject, Project } from '../../../../model';
import { projectToRawProject } from '../project-to-raw-project';
import { ProjectBuilder } from '../../../../builders/project.builder';

describe('projectToRawProject()', () => {

	it('should convert project to raw project', () => {
		const rawProject: RawProject = {
			id: '3',
			title: 'alpha',
			href: 'alpha.com',
			published: '1',
			tag1: 'angular',
			tag2: 'react',
			tag3: null,
		};

		const project: Project = new ProjectBuilder()
		.id('3')
		.title('alpha')
		.href('alpha.com')
		.published(true)
		.tag('angular', true)
		.tag('react', true)
		.build();

		expect(projectToRawProject(project)).toEqual(rawProject);

	});
});
