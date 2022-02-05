import { Project } from '../../../model';

export const projectToFormData = (project: Project) => {
	const formData = new FormData();

	formData.append('id', project.id);
	formData.append('title', project.title);
	formData.append('href', project.href);
	formData.append('published', project.published.toString());

	const tags = project.tags;

	Object.keys(tags)
	.filter(key => tags[key])
	.sort()
	.slice(0,3)
	.forEach((tag, index) => formData.append(`tag${index + 1}`, tag))

	return formData;
};
