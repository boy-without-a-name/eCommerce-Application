import { Component, Input } from '@angular/core';
import { ProductCart } from 'src/app/models/interface/cartProduct.interface';
import { CartService } from 'src/app/services/carts/carts.service';

@Component({
  selector: 'app-card-basket',
  templateUrl: './card.basket.component.html',
  styleUrls: ['./card.basket.component.scss'],
})
export class CardBasketComponent {
  showTotalPrice = true;
  showQuantity = true;
  totalPrice = '';
  curentQuantity = '';
  constructor(private carts: CartService) {}
  @Input() product: ProductCart;

  clickMinus(valueInput: string, lineItemId: string): void {
    localStorage.setItem('idCart', '97fde447-d06d-4168-afd7-72f50fd196cf');
    if (Number(valueInput) - 1 > 0) {
      this.carts
        .changeLineItemQuantity(
          localStorage.getItem('token'),
          lineItemId,
          Number(localStorage.getItem('version')),
          Number(valueInput),
          localStorage.getItem('idCart'),
          -1,
        )
        ?.subscribe((res) => {
          localStorage.version = res.version;
          console.log(res.version);
          this.showTotalPrice = false;
          this.curentQuantity = res.lineItems.filter((item) => item.id === lineItemId)[0].quantity.toString();
          this.totalPrice = (
            res.lineItems.filter((item) => item.id === lineItemId)[0].totalPrice.centAmount / 100
          ).toString();
        });
    }
  }
  clickPlus(valueInput: string, lineItemId: string): void {
    localStorage.setItem('idCart', '97fde447-d06d-4168-afd7-72f50fd196cf');
    this.carts
      .changeLineItemQuantity(
        localStorage.getItem('token'),
        lineItemId,
        Number(localStorage.getItem('version')),
        Number(valueInput),
        localStorage.getItem('idCart'),
        1,
      )
      ?.subscribe((res) => {
        localStorage.version = res.version;
        console.log(res.version);
        this.showTotalPrice = false;
        this.curentQuantity = res.lineItems.filter((item) => item.id === lineItemId)[0].quantity.toString();
        this.totalPrice = (
          res.lineItems.filter((item) => item.id === lineItemId)[0].totalPrice.centAmount / 100
        ).toString();
      });
  }
}
