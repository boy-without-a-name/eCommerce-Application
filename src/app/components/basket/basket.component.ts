import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/carts/carts.service';
import { ProductCart } from 'src/app/models/interface/cartProduct.interface';
@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss', './card.basket.component.scss'],
})
export class BasketComponent implements OnInit {
  showLinkCatalog = false;
  showCard = true;
  showQuantity = true;
  disabledBtn = false;
  showOrderingBlock = false;
  products: ProductCart[] = [];
  totalPrice: number;

  constructor(private carts: CartService) {}

  ngOnInit(): void {
    localStorage.setItem('idCart', '97fde447-d06d-4168-afd7-72f50fd196cf');
    if (localStorage.getItem('idCart') !== null) {
      this.carts.getCart('97fde447-d06d-4168-afd7-72f50fd196cf', localStorage.getItem('token'))?.subscribe({
        next: (response) => {
          if (response.lineItems.length === 0) {
            this.showLinkCatalog = true;
          } else {
            this.products = response.lineItems;
            this.totalPrice = response.totalPrice.centAmount;
            this.showOrderingBlock = true;
            localStorage.setItem('version', `${response.version}`);
          }
        },
      });
    } else {
      this.showLinkCatalog = true;
    }
  }

  clickMinus(valueInput: string, lineItemId: string): void {
    localStorage.setItem('idCart', '97fde447-d06d-4168-afd7-72f50fd196cf');
    if (Number(valueInput) - 1 > 0) {
      this.disabledBtn = true;
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
          this.products = res.lineItems;
          this.totalPrice = res.totalPrice.centAmount;
          this.disabledBtn = false;
        });
    }
  }
  clickPlus(valueInput: string, lineItemId: string): void {
    this.disabledBtn = true;
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
        this.products = res.lineItems;
        this.totalPrice = res.totalPrice.centAmount;
        this.disabledBtn = false;
      });
  }
  clickRemove(id: string, quantity: string): void {
    this.carts
      .removeLineItem(
        localStorage.getItem('token'),
        id,
        Number(localStorage.getItem('version')),
        localStorage.getItem('idCart'),
        Number(quantity),
      )
      ?.subscribe({
        next: (res) => {
          localStorage.version = res.version;
          if (res.lineItems.length === 0) {
            this.showLinkCatalog = true;
            this.showOrderingBlock = false;
          }
          this.products = res.lineItems;
          this.totalPrice = res.totalPrice.centAmount;
        },
      });
  }
}
