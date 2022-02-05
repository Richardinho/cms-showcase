import { Article } from '../../../model';

export const articleToFormGroup = (article: Article): any => {
  const obj: any = {};

  obj.id = article.id;
  obj.title = article.title;
  obj.summary = article.summary;
  obj.body = article.body;
	obj.tags = article.tags;
	
	return obj;
};
