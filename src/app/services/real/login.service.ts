import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ILoginService, LoginResponseData } from '../interfaces/login.service';


@Injectable()
export class RealLoginService implements ILoginService {

  constructor(
    private http: HttpClient) {}

	logIn(username: string, password: string) {
    const formData = new FormData();
    const url = environment.blogDomain + '/index.php/api/login';

    formData.append('username', username);
    formData.append('password', password);

    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });

    return this.http.post<LoginResponseData>(url, formData, { headers })
	}
}
