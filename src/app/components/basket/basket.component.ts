import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/carts/carts.service';
import { ProductCart } from 'src/app/models/interface/cartProduct.interface';
import { FormBuilder, Validators } from '@angular/forms';
import Toastify from 'toastify-js';
import { CartInterface } from 'src/app/models/interface/carts.interface';
import { CardEvent } from 'src/app/shared/class/cardEvent';

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
  totalPriceBeforePromo: number;
  disabledBtnRemoveCart = false;
  newTotalPrice: number;
  discountCodeForm;
  atLeastOnePromoMatchesCart: boolean;

  constructor(
    private carts: CartService,
    private formBuilder: FormBuilder,
    private event: CardEvent,
  ) {
    this.discountCodeForm = this.formBuilder.group({
      discountCode: ['', Validators.required],
    });
  }



  updateCartQuantity(totalLineItemQuantity: number): void {
    localStorage.setItem('totalLineItemQuantity', totalLineItemQuantity.toString());
    this.carts.updateTotalQuantity(totalLineItemQuantity);
  }

  setIsAtLeastOnePromoMatchesCart(cart: CartInterface): void {
    this.atLeastOnePromoMatchesCart = cart.discountCodes.some((code) => code.state === 'MatchesCart');
  }

  calculateTotalPriceBeforePromo(cart: CartInterface): void {
    // Total price before promo = initial total base price (if there are no discounted products in the cart)
    // Total price before promo is NOT the initial total base price (if one or more items in the cart had product discounts applied previously)

    if (cart.lineItems.length) {
      this.totalPriceBeforePromo = 0;
      cart.lineItems.forEach((item) => {
        if (item.price.discounted) {
          this.totalPriceBeforePromo += item.price.discounted.value.centAmount * item.quantity;
        } else {
          this.totalPriceBeforePromo += item.price.value.centAmount * item.quantity;
        }
      });
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('idCart') !== null) {
      this.carts.getCart(localStorage.getItem('idCart'), localStorage.getItem('token'))?.subscribe({
        next: (response) => {
          if (response.lineItems.length === 0) {
            this.showLinkCatalog = true;
          } else {
            this.products = response.lineItems;
            this.totalPrice = response.totalPrice.centAmount;
            this.showOrderingBlock = true;
            localStorage.setItem('version', `${response.version}`);
            this.calculateTotalPriceBeforePromo(response);
            this.setIsAtLeastOnePromoMatchesCart(response);
          }
          this.carts.updateTotalQuantity(response.totalLineItemQuantity);
        },
      });
    } else {
      this.showLinkCatalog = true;
    }
  }

  clickMinus(valueInput: string, lineItemId: string): void {
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


          this.carts.updateTotalQuantity(res.totalLineItemQuantity);

          this.updateCartQuantity(res.totalLineItemQuantity);
          this.calculateTotalPriceBeforePromo(res);
          this.setIsAtLeastOnePromoMatchesCart(res);
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


        this.carts.updateTotalQuantity(res.totalLineItemQuantity);

        this.updateCartQuantity(res.totalLineItemQuantity);
        this.calculateTotalPriceBeforePromo(res);
        this.setIsAtLeastOnePromoMatchesCart(res);

      });
  }

  clickRemove(id: string, quantity: string, productId: string): void {
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
          this.event.removeProductIdinLS(productId);
          if (res.lineItems.length === 0) {
            this.showLinkCatalog = true;
            this.showOrderingBlock = false;
          }
          this.products = res.lineItems;
          this.totalPrice = res.totalPrice.centAmount;


          this.carts.updateTotalQuantity(res.totalLineItemQuantity);

          this.updateCartQuantity(res.totalLineItemQuantity);
          this.calculateTotalPriceBeforePromo(res);
          this.setIsAtLeastOnePromoMatchesCart(res);

        },
      });
  }

  clickRemoveCart(): void {
    this.disabledBtnRemoveCart = true;
    this.carts
      .deleteCart(
        localStorage.getItem('token'),
        Number(localStorage.getItem('version')),
        localStorage.getItem('idCart'),
      )
      ?.subscribe((res) => {
        localStorage.removeItem('version');
        localStorage.removeItem('idCart');
        localStorage.removeItem('cartsProductId');
        this.products = res.lineItems;
        this.showLinkCatalog = true;
        this.showOrderingBlock = false;
        const Div = document.querySelector('.basket__items') as HTMLDivElement;
        while (Div.firstChild) {
          if (Div.lastChild) {
            Div.removeChild(Div.lastChild);
          }
        }

        this.carts.updateTotalQuantity(undefined);
      });
  }

  applyPromo(): void {
    this.disabledBtn = true;

    this.carts
      .addDiscountCode(
        String(localStorage.getItem('token')),
        Number(localStorage.getItem('version')),
        String(localStorage.getItem('idCart')),
        this.discountCodeForm.value.discountCode as string,
      )
      .subscribe({
        next: (response) => {
          console.log(response);

          localStorage.setItem('version', `${response.version}`);
          this.totalPrice = response.totalPrice.centAmount;
          this.calculateTotalPriceBeforePromo(response);
          this.setIsAtLeastOnePromoMatchesCart(response);

          let toastMsg = '';
          if (this.atLeastOnePromoMatchesCart) {
            toastMsg = 'Promo code successfully applied to your cart✅';
          } else {
            // promocode can be applied to cart, but not impact the total price (in case the cart doesnot match the promo requirements)
            // it will impact the total price as soon as the requirements are met (e.g. certain total cart price)
            toastMsg = 'Promo successfully applied, but no applied codes currently match your cart 😓';
          }
          Toastify({
            text: `${toastMsg}`,
            style: {
              background: 'lightgreen',
              padding: '0.2rem 0.5rem',
              'text-align': 'center',
              'border-radius': '4px',
              'font-weight': '600',
            },
            duration: 4000,
          }).showToast();

          this.disabledBtn = false;
          this.discountCodeForm.value.discountCode = '';
        },
        error: (error) => {
          console.log(error.error.message);

          Toastify({
            text: `${error.error.message} ❌`,
            style: {
              background: 'lightcoral',
              padding: '0.2rem 0.5rem',
              'text-align': 'center',
              'border-radius': '4px',
              'font-weight': '600',
            },
          }).showToast();

          this.disabledBtn = false;
          this.discountCodeForm.value.discountCode = '';
        },
      });
  }
}
