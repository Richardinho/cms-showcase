import { FormArticle } from './form-article.interface';
import { Article } from '../../../model';
import { tagData } from '../../../services/article.service';

/*
 * functions for working with data relating to the Angular FormGroup in the edit-article component
 */

interface ArticleFormGroup {
  id: string;
  title: string;
  summary: string;
  body: string;
}

/*
 *  Takes an article from the store and creates from it an object that we can use for creating
 *  an Angular form group
 */

export const articleToFormGroup = (article: Article): any => {
  const obj: any = {};

  obj.id = article.id;
  obj.title = article.title;
  obj.summary = article.summary;
  obj.body = article.body;

	const selectedTags = [article.tag1, article.tag2, article.tag3];

	obj.tags = tagData.reduce((result, tag) => {
		return {
			...result,
			[tag]: selectedTags.includes(tag),
		};
	}, {});
	
	return obj;
};

/*
 *  Takes data from a form group and creates an object used for patching an Article.
 *  Note that this isn't the reverse of the above; We can't create an Article object as the previous
 *  transformation removed information
 */

export const createArticlePatchData = (formData, tagData): any => {
  const obj: any = {};

  obj.id = formData.id;
  obj.title = formData.title;
  obj.body = formData.body;
  obj.summary = formData.summary;
  obj.saved = false;

	const [tag1=null, tag2=null, tag3=null] = Object.keys(formData.tags).sort().reduce((result, tag) => {
		if (formData.tags[tag]) {
			return [...result, tag];
		}

		return result;
	}, []);	

	obj.tag1 = tag1;
	obj.tag2 = tag2;
	obj.tag3 = tag3;

  return obj;
};
