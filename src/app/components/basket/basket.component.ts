import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/carts/carts.service';
import { ProductCart } from 'src/app/models/interface/cartProduct.interface';
@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  showLinkCatalog = false;
  product: ProductCart[] = [];

  constructor(private basket: CartService) {}

  ngOnInit(): void {
    this.basket.getCart('97fde447-d06d-4168-afd7-72f50fd196cf', localStorage.getItem('token'))?.subscribe({
      next: (response) => {
        if (response.lineItems.length === 0) {
          this.showLinkCatalog = true;
        } else {
          this.product = response.lineItems;
          localStorage.setItem('version', `${response.version}`);
        }
      },
    });
  }
}
