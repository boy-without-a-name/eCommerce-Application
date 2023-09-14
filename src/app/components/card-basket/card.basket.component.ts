import { Component, Input } from '@angular/core';
import { ProductCart } from 'src/app/models/interface/cartProduct.interface';

@Component({
  selector: 'app-card-basket',
  templateUrl: './card.basket.component.html',
  styleUrls: ['./card.basket.component.scss'],
})
export class CardBasketComponent {
  @Input() product: ProductCart;
}
