import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccessTokenResponse } from './types';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  apiUrl = 'https://api.australia-southeast1.gcp.commercetools.com/arandomteam16/customers -i';
  access_token: string | undefined = '';
  constructor(private http: HttpClient) {}
  getToken() {
    const clientId = 'nW_nTeh94asuW0LieFf0ZmY-';
    const clientSecret = 'BoJN0ZkMEVNwB-IjGHoDdXfF42CvrdVV';
    const scope = 'manage_project:arandomteam16';
    const tokenUrl = 'https://auth.australia-southeast1.gcp.commercetools.com/oauth/token';

    try {
      const data = new URLSearchParams();
      data.append('grant_type', 'client_credentials');
      data.append('scope', scope);

      const headers = new HttpHeaders()
        .set('Authorization', `Basic ${btoa(`${clientId}:${clientSecret}`)}`)
        .set('Content-Type', 'application/x-www-form-urlencoded');

      return this.http.post(tokenUrl, data.toString(), { headers });
    } catch (error) {
      console.error('Ошибка при выполнении запроса', error);
      return null;
    }
  }
  createToken() {
    this.getToken()?.subscribe((obj: AccessTokenResponse) => {
      this.access_token = obj.access_token;
      localStorage.setItem('token', `${obj.access_token}`);
    });
  }

  getAuthToken() {
    return this.access_token;
  }
}
