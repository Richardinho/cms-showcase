import { ShowcaseLoginService } from '../services/showcase-login.service';
import { RealLoginService } from '../services/real/login.service';
import { LOGIN_SERVICE } from '../services/interfaces/login.service';
import { environment } from '../../environments/environment';

const mode = environment.mode;

export const loginServiceProvider = {
	provide: LOGIN_SERVICE,
	useClass: mode === 'showcase' ? ShowcaseLoginService : RealLoginService,
};
