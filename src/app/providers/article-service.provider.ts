import { ShowcaseArticleService } from '../services/showcase/article.service';
import { ARTICLE_SERVICE } from '../services/interfaces/article.service';
import { RealArticleService } from '../services/real/article.service';
import { environment } from '../../environments/environment';

const mode = environment.mode;

export const articleServiceProvider = {
	provide: ARTICLE_SERVICE,
	useClass: mode === 'showcase' ? ShowcaseArticleService : RealArticleService,
};
