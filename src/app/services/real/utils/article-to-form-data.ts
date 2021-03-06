import { Article } from '../../../model';


export const articleToFormData = (article: Article): FormData => {
  const formData = new FormData();

  formData.append('title', article.title);
  formData.append('id', article.id);
  formData.append('body', article.body);
  formData.append('summary', article.summary);
  formData.append('published', article.published.toString());

  const tags = article.tags;

  Object.keys(tags)
    .filter(key => {
      return tags[key];
    })
		.sort()
    .slice(0, 3)
    .forEach((tag, index) => {
      formData.append(`tag${index + 1}`, tag);
    });

  return formData;
};
