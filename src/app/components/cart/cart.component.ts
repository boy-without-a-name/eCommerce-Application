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
    this.cartService.totalQuantity$.subscribe((quantity) => {
      this.totalQuantity = quantity;
    });
  }
}
