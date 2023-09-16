import { Component, Input } from '@angular/core';
import { CardFilterInterface } from 'src/app/models/interface/results.filter.intreface';
import { GetProductService } from '../../services/getProduct/get-product.service';
import { CartService } from 'src/app/services/carts/carts.service';
@Component({
  selector: 'app-card-filter',
  templateUrl: './card.component.html',
  styleUrls: ['../card-product/card.component.scss'],
})
export class CardFilterComponent {
  buttonPosition = false;
  constructor(
    public getProductService: GetProductService,
    private carts: CartService,
  ) {}
  @Input() productfilter: CardFilterInterface;

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
