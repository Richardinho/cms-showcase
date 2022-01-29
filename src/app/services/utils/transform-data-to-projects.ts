import { Project } from '../../model';

export const transformDataToProjects = (data: Array<any>): Array<Project> => {

	if (Array.isArray(data)) {

		return data.map((item: any): Project => {

			return {
				id: item.id,
				title: item.title,
				href: item.href,
				tags: {
					foo: true,
				},
				underEdit: false,
				published: Boolean(parseInt(item.published)),
				saved: true,
			};

		});
	}

	return [] as Array<Project>;
};
