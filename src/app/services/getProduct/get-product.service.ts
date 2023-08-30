import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Current, IProduct } from '../../models/interface/product.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GetProductService {
  idKey: string = '0';
  apiUrl = 'https://api.australia-southeast1.gcp.commercetools.com/arandomteam16/products/';
  id = '2168611f-2c95-423a-8692-b9ba4e46a719';
  productResp: Current | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  setKey(id: string) {
    this.idKey = `${id}`;
  }

  getProductData() {
    this.renderProduct();
    return this.productResp;
  }

  getProduct(id: string = this.id) {
    const headers = new HttpHeaders({
      Authorization: `Bearer NxJZQV-vy3Ao2dBwdzSb0_FsJ-vGEXdK`,
      'Content-type': 'application/json',
    });
    return this.http.get<IProduct>(`${this.apiUrl}${id}`, { headers });
  }

  renderProduct(id: string = this.id) {
    this.getProduct(id).subscribe(
      (data) => {
        this.productResp = data.masterData.current;
        this.router.navigate(['/product', id]);
      },
      (error) => {
        console.log(error);
      },
    );
    return this.getProductData();
  }
}
