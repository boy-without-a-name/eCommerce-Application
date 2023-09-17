import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartInterface } from 'src/app/models/interface/carts.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  private totalQuantitySubject = new BehaviorSubject<number>(0);
  totalQuantity$ = this.totalQuantitySubject.asObservable();

  updateTotalQuantity(quantity: number): void {
    this.totalQuantitySubject.next(quantity);
  }

  createCart(token: string | null): Observable<CartInterface> | null {
    const body = {
      currency: 'EUR',
      taxMode: 'Disabled',
    };

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');

    return this.http.post<CartInterface>(
      'https://api.australia-southeast1.gcp.commercetools.com/arandomteam16/carts/',
      JSON.stringify(body),
      { headers },
    );
  }

  getCart(id: string | null, token: string | null): Observable<CartInterface> | null {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CartInterface>(
      `https://api.australia-southeast1.gcp.commercetools.com/arandomteam16/carts/${id}`,
      { headers },
    );
  }

  addLineItem(
    token: string | null,
    productId: string,
    version: number,
    idCart: string | null,
  ): Observable<CartInterface> | null {
    const body = {
      version: version,
      actions: [
        {
          action: 'addLineItem',
          productId: `${productId}`,
          variantId: 1,
          quantity: 1,
        },
      ],
    };

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');

    return this.http.post<CartInterface>(
      `https://api.australia-southeast1.gcp.commercetools.com/arandomteam16/carts/${idCart}`,
      JSON.stringify(body),
      { headers },
    );
  }

  removeLineItem(
    token: string | null,
    lineItemId: string,
    version: number,
    idCart: string | null,
    quantity = 1,
  ): Observable<CartInterface> | null {
    const body = {
      version: version,
      actions: [
        {
          action: 'removeLineItem',
          lineItemId: `${lineItemId}`,
          quantity: quantity,
        },
      ],
    };

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');

    return this.http.post<CartInterface>(
      `https://api.australia-southeast1.gcp.commercetools.com/arandomteam16/carts/${idCart}`,
      JSON.stringify(body),
      { headers },
    );
  }
  changeLineItemQuantity(
    token: string | null,
    lineItemId: string,
    version: number,
    quantity: number,
    idCart: string | null,
    step?: number,
  ): Observable<CartInterface> | null {
    let num: number;
    if (step === undefined) {
      num = quantity;
    } else if (step > 0) {
      num = quantity + 1;
    } else {
      num = quantity - 1;
    }
    const body = {
      version: version,
      actions: [
        {
          action: 'changeLineItemQuantity',
          lineItemId: `${lineItemId}`,
          quantity: num,
        },
      ],
    };

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');

    return this.http.post<CartInterface>(
      `https://api.australia-southeast1.gcp.commercetools.com/arandomteam16/carts/${idCart}`,
      JSON.stringify(body),
      { headers },
    );
  }

  deleteCart(token: string | null, version: number, idCart: string | null): Observable<CartInterface> | null {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<CartInterface>(
      `https://api.australia-southeast1.gcp.commercetools.com/arandomteam16/carts/${idCart}?version=${version}`,
      { headers },
    );
  }

  addDiscountCode(
    token: string | null,
    version: number,
    idCart: string | null,
    discountCode: string,
  ): Observable<CartInterface> {
    const body = {
      version: version,
      actions: [
        {
          action: 'addDiscountCode',
          code: `${discountCode}`,
        },
      ],
    };
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');
    return this.http.post<CartInterface>(
      `https://api.australia-southeast1.gcp.commercetools.com/arandomteam16/carts/${idCart}`,
      JSON.stringify(body),
      { headers },
    );
  }

  removeDiscountCode(
    token: string | null,
    version: number,
    idCart: string | null,
    discountCodeId: string,
  ): Observable<CartInterface> {
    const body = {
      version: version,
      action: 'removeDiscountCode',
      discountCode: {
        typeId: 'discount-code',
        id: `${discountCodeId}`,
      },
    };
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');
    return this.http.post<CartInterface>(
      `https://api.australia-southeast1.gcp.commercetools.com/arandomteam16/carts/${idCart}`,
      JSON.stringify(body),
      { headers },
    );
  }
}
