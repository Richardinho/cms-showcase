import { PROJECT_SERVICE } from '../services/interfaces/project.service';
import { ShowcaseProjectService } from '../services/showcase/project.service';
import { RealProjectService } from '../services/real/project.service';
import { environment } from '../../environments/environment';

const mode = environment.mode;

export const projectServiceProvider = {
	provide: PROJECT_SERVICE,
	useClass: mode === 'showcase' ? ShowcaseProjectService : RealProjectService,
};
