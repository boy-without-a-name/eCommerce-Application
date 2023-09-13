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
  constructor(public getProductService: GetProductService, private cart: CartService) {}
  @Input() productfilter: CardFilterInterface;

  clickBtn(productId:string): void {
    this.buttonPosition = true;
    this.cart.getCart('97fde447-d06d-4168-afd7-72f50fd196cf', localStorage.getItem('token'))?.subscribe({
      next: (response)=> {
        console.log(response)
        this.cart.addLineItem(localStorage.getItem('token'),
        productId,
        response.version,
        '97fde447-d06d-4168-afd7-72f50fd196cf')?.subscribe((response)=>console.log(response))
      }
    })
  }
}
