import { RawArticle } from '../../model';

export const createRawArticle = (id: string) => {
	return {
		"id": id,
		"title": "",
		"date_created": "Nov 28 2020",
		"date_edited": "",
		"body": "sfsf",
		"author": "Richard",
		"summary": "",
		"tag1": null,
		"tag2": null,
		"tag3": null,
		"published": false
	} as RawArticle;
};
