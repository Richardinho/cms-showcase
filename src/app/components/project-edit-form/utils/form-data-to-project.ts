import { Project } from '../../../model';

export const formDataToProject = (project: any, id: string): Project => {
	const result: any = {};

	result.title = project.title;
	result.href = project.href;
	result.id = id;
	result.published = project.published;

	const [tag1=null, tag2=null, tag3=null] = Object.keys(project.tags).sort().reduce((result, tag) => {
		if (project.tags[tag]) {
			return [...result, tag];
		}

		return result;
	}, []);	

	result.tag1 = tag1;
	result.tag2 = tag2;
	result.tag3 = tag3;

	return result as Project;
};
