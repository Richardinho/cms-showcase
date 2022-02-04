import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export interface IMetadataService {

	putMetadata(token: string, metadata: any): Observable<any>;

	getMetadata(token: string): Observable<any>;

}

export const METADATA_SERVICE = new InjectionToken<IMetadataService>('metadata.service');
