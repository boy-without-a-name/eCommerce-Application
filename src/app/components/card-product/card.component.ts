import { Component, Input } from '@angular/core';
import { ResultInterface } from 'src/app/models/interface/result.interfce';
import { GetProductService } from '../../services/getProduct/get-product.service';
import { CartService } from 'src/app/services/carts/carts.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  buttonPosition = false;
  constructor(
    public getProductService: GetProductService,
    private carts: CartService,
  ) {}
  @Input() product: ResultInterface;

  clickBtn(productId: string): void {


    this.buttonPosition = true;
  }
}
