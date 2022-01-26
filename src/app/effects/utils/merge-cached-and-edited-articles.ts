import { Article, EditArticleView } from '../../model';

export const mergeCachedAndEditedArticles = (cachedArticle: Article, editedArticle: EditArticleView): Article => {

	const { id, title, body, summary, tags } = editedArticle;
	const { published } = cachedArticle;

	const [tag1=null, tag2=null, tag3=null] = Object.keys(tags).sort().reduce((result, tag) => {
		if (tags[tag]) {
			return [...result, tag];
		}

		return result;
	}, []);	

	const result: Article = {
		id,
		title,
		body,
		summary,
		published, 
		tag1,
		tag2,
		tag3,
	}

	return result;
};
