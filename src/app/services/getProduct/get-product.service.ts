import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Current, IProduct } from '../../models/interface/product.interface';
import { Router } from '@angular/router';
import { register } from 'swiper/swiper-element';

@Injectable({
  providedIn: 'root',
})
export class GetProductService {
  apiUrl = 'https://api.australia-southeast1.gcp.commercetools.com/arandomteam16/products/';
  id = '2168611f-2c95-423a-8692-b9ba4e46a719';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getProduct(id: string = this.id) {
    const headers = new HttpHeaders({
      Authorization: `Bearer lgaRP9fI742jIxhu2SHmPgnGbGkTfm7Q`,
      'Content-type': 'application/json',
    });
    return this.http.get<IProduct>(`${this.apiUrl}${id}`, { headers });
  }

  renderProduct(id: string = this.id) {
    this.router.navigate(['/product', id]);
  }
}
