import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CatalogInterface } from 'src/app/models/interface/catalog.interface';
import { AccessTokenResponse } from 'src/app/models/interface/AnswerTokenResponseInterface';
import { clientId, clientSecret, scope } from 'src/app/models/constants/constants';
import { AnswerFilterInterface } from 'src/app/models/interface/asnwerfilter.interface';

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
  pageNo = 0;

  constructor(private http: HttpClient) {}

  setPageNo(no: number): void {
    this.pageNo = no;
  }

  getPageNo(): number {
    return this.pageNo;
  }

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

  getProgucts(authToken: string | null, pageSize = 100, pageOffset = 0): Observable<CatalogInterface> | null {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    return this.http.get<CatalogInterface>(
      `https://api.australia-southeast1.gcp.commercetools.com/arandomteam16/products/?&limit=${pageSize}&offset=${pageOffset}`,
      { headers },
    );
  }

  test(authToken: string | null, value: string, pageSized = 100, pageOffset = 0): Observable<AnswerFilterInterface> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    return this.http.get<AnswerFilterInterface>(
      `https://api.australia-southeast1.gcp.commercetools.com/arandomteam16/product-projections/search?${value}&limit=${pageSized}&offset=${pageOffset}`,
      { headers },
    );
  }
}
