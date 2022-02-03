import { ShowcaseArticleService } from '../services/showcase-article.service';

export const articleServiceProvider = {
	provide: ShowcaseArticleService,
	useClass: ShowcaseArticleService,
};
