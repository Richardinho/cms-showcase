import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { Metadata } from '../../model';

export interface IMetadataService {

	putMetadata(token: string, metadata: Metadata): Observable<any>;

	getMetadata(token: string): Observable<Metadata>;

}

export const METADATA_SERVICE = new InjectionToken<IMetadataService>('metadata.service');
