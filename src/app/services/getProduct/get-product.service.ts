import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GetProductService {
  idKey: string = '0';
  apiUrl = 'https://api.australia-southeast1.gcp.commercetools.com/arandomteam16/products/key=';

  constructor(private http: HttpClient) {}

  setKey(id: string) {
    this.idKey = `${id}`;
  }

  getProduct() {
    return this.http.get(`${this.apiUrl}${this.idKey}`);
  }
}
