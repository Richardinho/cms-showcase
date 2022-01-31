import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';


let serverMetadata = {
	"github_url": "https://github.com/Richardinho",
	"saved" : true,
};

@Injectable()
export class MetadataService {

	constructor() {}

	putMetadata(token:string, metadata: any) {
		serverMetadata = metadata;
		return of(serverMetadata).pipe(delay(4000));
	}

	getMetadata(token: string) {
		return of(serverMetadata);
	}
}
