export const updateLinks = (links: any, articleJSON: any) => {
  //  todo: write test for this
  const id = articleJSON.id;
  const published = articleJSON.published;

	return links.map((link, index) => {
		if (link.id === articleJSON.id) {
			return {
				...link,
				published: articleJSON.published,
			};
		}

		return link;
	});
};
