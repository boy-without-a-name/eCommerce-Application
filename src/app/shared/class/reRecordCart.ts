import { Injectable } from '@angular/core';
import { CartService } from 'src/app/services/carts/carts.service';

@Injectable({
  providedIn: 'root',
})
export class ReRecordCart {
  constructor(private cart: CartService) {}

  reRecordCart(): void {
    if (localStorage.getItem('idCart')) {
      if (
        localStorage.getItem('cartsProductId') &&
        Object.keys(JSON.parse(localStorage.getItem('cartsProductId') as string)).length > 0
      ) {
        this.cart.replicateCart(localStorage.getItem('token'), localStorage.getItem('idCart'))?.subscribe((res) => {
          localStorage.idCart = res.id;
          localStorage.version = res.version;
        });
      }
    }
  }
}
