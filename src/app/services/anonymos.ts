import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccessToken } from '../models/interface/token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnonymosService {
  constructor(private http: HttpClient) {}
  getToken(): Observable<AccessToken> | null {
    const clientId = 'nW_nTeh94asuW0LieFf0ZmY-';
    const clientSecret = 'BoJN0ZkMEVNwB-IjGHoDdXfF42CvrdVV';
    const scope = 'manage_project:arandomteam16';
    const tokenUrl = 'https://auth.australia-southeast1.gcp.commercetools.com/oauth/token';

    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('scope', scope);

    const headers = new HttpHeaders()
      .set('Authorization', `Basic ${btoa(`${clientId}:${clientSecret}`)}`)
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<AccessToken>(tokenUrl, data.toString(), { headers });
  }
}
