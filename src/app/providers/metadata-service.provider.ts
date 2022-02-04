import { METADATA_SERVICE } from '../services/interfaces/metadata.service';
import { ShowcaseMetadataService } from '../services/showcase/metadata.service';
import { RealMetadataService } from '../services/real/metadata.service';
import { environment } from '../../environments/environment';

const mode = environment.mode;

export const metadataServiceProvider = {
	provide: METADATA_SERVICE,
	useClass: mode == 'showcase' ? ShowcaseMetadataService : RealMetadataService,
};
