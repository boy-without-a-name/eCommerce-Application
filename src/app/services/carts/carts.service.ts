import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartInterface } from 'src/app/models/interface/carts.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  createCart(token: string | null): Observable<CartInterface> | null {
    const data = new URLSearchParams();
    data.append('currency' , 'EUR');

    const headers = new HttpHeaders()
       .set('Authorization', `Bearer ${token}`)
       .set('Content-Type', 'application/json');

    return this.http.post<CartInterface>('https://api.australia-southeast1.gcp.commercetools.com/arandomteam16/carts/', data.toString(), { headers });
  }

}
