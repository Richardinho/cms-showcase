import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Metadata } from '../../model';
import { IMetadataService } from '../interfaces/metadata.service';
import { rawMetadataToMetadata } from '../utils/raw-metadata-to-metadata';

let serverMetadata = {
	"github_url": "https://github.com/Richardinho",
	"email": "",
	"location": "",
	"website": "",
};

@Injectable()
export class ShowcaseMetadataService implements IMetadataService{

	constructor() {}

	putMetadata(token:string, metadata: any) {
		serverMetadata = metadata;
		return of(serverMetadata).pipe(delay(4000));
	}

	getMetadata(token: string): Observable<Metadata> {
		return of(rawMetadataToMetadata(serverMetadata));
	}
}
