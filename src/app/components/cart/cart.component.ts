import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/carts/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  totalQuantity = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    const storedQuantity = localStorage.getItem('cartQuantity');

    if (storedQuantity) {
      this.totalQuantity = Number(storedQuantity);
    } else {
      this.totalQuantity = 0;
    }

    this.cartService.totalQuantity$.subscribe((quantity) => {
      let storedQuantity = Number(localStorage.getItem('cartQuantity'));

      if (quantity === undefined) {
        storedQuantity = 0;
        localStorage.setItem('cartQuantity', JSON.stringify(storedQuantity));
        this.totalQuantity = 0;
      }

      if (quantity) {
        this.totalQuantity = quantity;
        localStorage.setItem('cartQuantity', quantity.toString());
      } else {
        if (storedQuantity) {
          this.totalQuantity = storedQuantity;
        } else {
          this.totalQuantity = 0;
        }
      }
    });
  }
}
