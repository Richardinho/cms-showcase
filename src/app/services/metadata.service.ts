import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


let serverMetadata = {
	"github_url": "https://github.com/Richardinho",
	"location": "London",
	"email": "richard@richardhunter.co.uk",
	"website": "Test Website"
};

@Injectable()
export class MetadataService {

  constructor() {}

  putMetadata(token:string, metadata: any) {
		serverMetadata = metadata;
		return of(serverMetadata);
  }

	getMetadata(token: string) {
		return of(serverMetadata);
  }
}
