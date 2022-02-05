import { RawProject, Project } from '../../../model';


export const projectToRawProject = (project: Project): RawProject => {

	const result: any = {};

	result.id = project.id;
	result.title = project.title;
	result.href = project.href;
	result.published = project.published ? '1' : '0';

	const tags = project.tags;

	const [tag1 = null, tag2 = null, tag3 = null] = Object.keys(tags)
	.filter(key => tags[key])
	.sort();

	result.tag1 = tag1;
	result.tag2 = tag2;
	result.tag3 = tag3;

	return result as RawProject;
};
