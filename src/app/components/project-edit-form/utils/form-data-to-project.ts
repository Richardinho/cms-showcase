import { Project } from '../../../model';

export const formDataToProject = (project: any, id: string): Project => {
	const result: any = {};

	result.id = id;
	result.title = project.title;
	result.href = project.href;
	result.published = project.published;
	result.underEdit = true;
	result.tags = project.tags;
	result.saved = false;

	return result as Project;
};
