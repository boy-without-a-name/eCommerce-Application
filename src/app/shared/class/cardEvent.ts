import { Injectable } from '@angular/core';
import { CartService } from 'src/app/services/carts/carts.service';
import { GetProductService } from 'src/app/services/getProduct/get-product.service';

@Injectable({
  providedIn: 'root',
})
export class CardEvent {
  constructor(
    public getProductService: GetProductService,
    private carts: CartService,
  ) {}

  saveLocalStorage(productId: string): void {
    if (localStorage.getItem('cartsProductId') == null) {
      localStorage.setItem('cartsProductId', '{}');
    }
    const data = JSON.parse(localStorage.getItem('cartsProductId') as string);
    if (data[`${productId}`] == undefined) {
      data[`${productId}`] = productId;
    }
    localStorage.cartsProductId = JSON.stringify(data);
  }

  addLineItem(productId: string): void {
    this.carts
      .addLineItem(
        localStorage.getItem('token'),
        productId,
        Number(localStorage.getItem('version')),
        localStorage.getItem('idCart'),
      )
      ?.subscribe((res) => {
        localStorage.version = res.version;
        this.saveLocalStorage(productId);
        this.carts.updateTotalQuantity(res.totalLineItemQuantity);
      });
  }

  removeProductIdinLS(productId: string): void {
    const data = JSON.parse(localStorage.getItem('cartsProductId') as string);
    delete data[productId];
    localStorage.cartsProductId = JSON.stringify(data);
  }

  clickBtn(productId: string): void {
    if (localStorage.getItem('idCart') == null) {
      this.carts.createCart(localStorage.getItem('token'))?.subscribe((res) => {
        localStorage.setItem('idCart', `${res.id}`);
        localStorage.setItem('version', `${res.version}`);
        this.addLineItem(productId);
      });
    } else {
      this.addLineItem(productId);
    }
  }

  disabled(productId: string): boolean {
    if (localStorage.getItem('cartsProductId')) {
      const data = JSON.parse(localStorage.getItem('cartsProductId') as string);
      if (data[productId]) {
        return true;
      }
    }
    return false;
  }

  removeCard(productId: string): void {
    this.carts.getCart(localStorage.getItem('idCart'), localStorage.getItem('token'))?.subscribe((res) => {
      const array = res.lineItems.filter((value) => value.productId === productId);
      this.carts
        .removeLineItem(
          localStorage.getItem('token'),
          array[0].id,
          Number(localStorage.getItem('version')),
          localStorage.getItem('idCart'),
          array[0].quantity,
        )
        ?.subscribe((res) => {
          localStorage.version = res.version;
          this.removeProductIdinLS(productId);
          this.carts.updateTotalQuantity(res.totalLineItemQuantity);
        });
    });
  }
}
