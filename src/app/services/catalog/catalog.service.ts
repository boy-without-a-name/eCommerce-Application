import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CatalogInterface } from 'src/app/models/interface/catalog.interface';
import { AccessTokenResponse } from 'src/app/models/interface/AnswerTokenResponseInterface';
import { scope, clientId, clientSecret } from 'src/app/models/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
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

    return this.http.post('https://auth.australia-southeast1.gcp.commercetools.com/oauth/token', data.toString(), {
      headers,
    });
  }

  getProgucts(authToken: string | null): Observable<CatalogInterface> | null {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    return this.http.get('https://api.australia-southeast1.gcp.commercetools.com/arandomteam16/products', { headers });
  }
}
