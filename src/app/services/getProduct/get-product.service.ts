import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProduct } from '../../models/interface/product.interface';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { AccessTokenResponse } from '../../models/interface/AnswerTokenResponseInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetProductService {
  apiUrl = 'https://api.australia-southeast1.gcp.commercetools.com/arandomteam16/products/';
  id = '2168611f-2c95-423a-8692-b9ba4e46a719';
  access_token: string | undefined = '';
  constructor(
    private http: HttpClient,
    private router: Router,
    private register: RegisterService,
  ) {}

  saveToken(): void {
    this.register.getToken()?.subscribe((obj: AccessTokenResponse) => {
      this.access_token = obj.access_token;
    });
  }
  getProduct(id: string = this.id): Observable<IProduct> {
    this.saveToken();
    const authToken = this.register.getAuthToken();
    console.log(authToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authTokenMain')}`,
      'Content-type': 'application/json',
    });
    return this.http.get<IProduct>(`${this.apiUrl}${id}`, { headers });
  }

  renderProduct(id: string = this.id): void {
    this.router.navigate(['/product', id]);
  }
}
