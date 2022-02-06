import { Injectable } from '@angular/core';
import { RawMetadata, Metadata } from '../../model';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import {
	Observable,
	throwError,
	of,
} from 'rxjs';

import {
	map,
	catchError,
} from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { IMetadataService } from '../interfaces/metadata.service';
import { rawMetadataToMetadata } from '../utils/raw-metadata-to-metadata';

@Injectable()
export class RealMetadataService implements IMetadataService {

  constructor(
    private http: HttpClient,
  ) {}

  putMetadata(token:string, metadata: any) {
    const url = environment.blogDomain + '/index.php/api/metadata';
    const formData = new FormData();

    formData.append('github_url', metadata.github_url);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${token}`,
        'enctype': 'multipart/form-data',
      })
    };

    return this.http.post<any>(url, formData, httpOptions)
      .pipe(
        map((data) => {
          return data;
        }),
      );
  }

  getMetadata(token: string): Observable<Metadata> {
    const url = environment.blogDomain + '/index.php/api/metadata';

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${token}`,
      })
    };

    return this.http.get<RawMetadata>(url, httpOptions)
      .pipe(
        map((data:RawMetadata) => {
          return rawMetadataToMetadata(data);
        }),
      );
  }
} 
