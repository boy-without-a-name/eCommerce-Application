import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessTokenResponse } from 'src/app/models/interface/AnswerTokenResponseInterface';
import { scope, clientId, clientSecret } from 'src/app/models/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AnonymousService {
  answer: AccessTokenResponse = {
    access_token: '',
    expires_in: 0,
    scope: '',
    token_type: '',
  };

  constructor(private http: HttpClient) {}

  getToken(): Observable<AccessTokenResponse> | null {
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('scope', scope);

    const headers = new HttpHeaders()
      .set('Authorization', `Basic ${btoa(`${clientId}:${clientSecret}`)}`)
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(
      'https://https://auth.australia-southeast1.gcp.commercetools.com/oauth/arandomteam16/anonymous/token',
      data.toString(),
      { headers },
    );
  }
}
