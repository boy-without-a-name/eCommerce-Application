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
    if (localStorage.getItem('idCart') == null) {
      this.carts.createCart(localStorage.getItem('token'))?.subscribe((res) => {
        localStorage.setItem('idCart', `${res.id}`);
        localStorage.setItem('version', `${res.version}`);
        this.carts
          .addLineItem(
            localStorage.getItem('token'),
            productId,
            Number(localStorage.getItem('version')),
            localStorage.getItem('idCart'),
          )
          ?.subscribe((res) => {
            localStorage.version = res.version;
          });
      });
    } else {
      this.carts
        .addLineItem(
          localStorage.getItem('token'),
          productId,
          Number(localStorage.getItem('version')),
          localStorage.getItem('idCart'),
        )
        ?.subscribe((res) => {
          localStorage.version = res.version;
        });
    }
    this.buttonPosition = true;
  }
}
