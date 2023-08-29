import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GetProductService {
  idKey: string = '0';
  apiUrl = 'https://api.australia-southeast1.gcp.commercetools.com/arandomteam16/products/';
  id = '2168611f-2c95-423a-8692-b9ba4e46a719';

  constructor(private http: HttpClient) {}

  setKey(id: string) {
    this.idKey = `${id}`;
  }

  getProduct() {
    const headers = new HttpHeaders({
      Authorization: `Bearer NxJZQV-vy3Ao2dBwdzSb0_FsJ-vGEXdK`,
      'Content-type': 'application/json',
    });
    return this.http.get(`${this.apiUrl}${this.id}`, { headers });
  }
}
