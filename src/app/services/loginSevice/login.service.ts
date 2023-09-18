import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DataUser } from 'src/app/models/interface/dataUser.interface';
import { AccessTokenResponse } from 'src/app/models/interface/AnswerTokenResponseInterface';
import { scope, clientId, clientSecret, tokenUrlLogin } from 'src/app/models/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  answer: AccessTokenResponse = {
    access_token: '',
    expires_in: 0,
    scope: '',
    token_type: '',
  };

  constructor(private http: HttpClient) {}

  getToken(email: string, password: string): Observable<AccessTokenResponse> | null {
    const data = new URLSearchParams();
    data.append('grant_type', 'password');
    data.append('username', `${email}`);
    data.append('password', `${password}`);
    data.append('scope', scope);

    const headers = new HttpHeaders()
      .set('Authorization', `Basic ${btoa(`${clientId}:${clientSecret}`)}`)
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<AccessTokenResponse>(tokenUrlLogin, data.toString(), { headers });
  }

  getUserData(authToken: string | null): Observable<DataUser> | null {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    return this.http.get('https://api.australia-southeast1.gcp.commercetools.com/arandomteam16/me', { headers });
  }
}
