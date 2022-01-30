import { RawProject, Project } from '../../model';
import { tagData } from '../../tag-data';

export const rawProjectToProject = (rawProject: RawProject): Project => {
	const project: any = {};

	project.id = rawProject.id;
	project.title = rawProject.title;
	project.href = rawProject.href;
	project.underEdit = false;
	project.published = Boolean(parseInt(rawProject.published, 10));
	project.saved = true;

	const selectedTags = [
		rawProject.tag1,
		rawProject.tag2,
		rawProject.tag3,
	];

	project.tags = tagData.reduce((result, tag) => {
		return {
			...result,
			[tag]: selectedTags.includes(tag),
		};
	}, {});


	return project as Project;

};
