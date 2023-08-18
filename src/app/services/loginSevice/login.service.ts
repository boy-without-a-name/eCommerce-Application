import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccessTokenResponse } from 'src/app/models/interface/AnswerTokenResponseInterface';
import { scope, clientId, clientSecret, tokenUrlLogin } from 'src/app/models/constants/constants'
import { Observable } from 'rxjs';

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

        const token = this.http.post(tokenUrlLogin, data.toString(), { headers });
      return token;

  }
}
