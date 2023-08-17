import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccessTokenResponse } from './types';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  answer: AccessTokenResponse = {
    access_token: '',
    expires_in: 0,
    scope: '',
    token_type: ''
  };
  apiUrl = 'https://api.australia-southeast1.gcp.commercetools.com/arandomteam16/customers -i';

  constructor(private http: HttpClient) {
  }

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

  async register() {
    const authToken = this.getToken();
    authToken?.subscribe((data: AccessTokenResponse) => {
      console.log(data);
      const access_token = data.access_token;
      const apiUrl = 'https://api.australia-southeast1.gcp.commercetools.com/arandomteam16/customers';
      const headers: HttpHeaders = new HttpHeaders({
        'Authorization': `Bearer ${access_token}`,
        'Content-type': 'application/json'
      });
      console.log(headers);
      const requestData = {
        'email': 'johndoe@example.com',
        'firstName': 'John',
        'lastName': 'Doe',
        'password': 'secret123'
      };
      const resp = this.http.post(apiUrl, requestData, {
        headers
      });
      resp.subscribe((re) => {
        console.log(re);
      });
    });
  }
}
