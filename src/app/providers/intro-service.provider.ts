import { ShowcaseIntroService } from '../services/showcase/intro.service';
import { RealIntroService } from '../services/real/intro.service';
import { INTRO_SERVICE } from '../services/interfaces/intro.service';
import { environment } from '../../environments/environment';

const mode = environment.mode;

export const introServiceProvider = {
	provide: INTRO_SERVICE,
	useClass: mode == 'showcase' ? ShowcaseIntroService : RealIntroService,
};
