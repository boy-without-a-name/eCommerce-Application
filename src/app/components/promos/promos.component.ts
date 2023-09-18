import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.scss'],
})
export class PromosComponent {
  constructor(private clipboard: Clipboard) {}

  promos = [{ name: '10% off each cart item (for carts > 3000 USD)', code: 'massive-discount' }];

  copyPromoCode(promoCodeToCopy: string): void {
    this.clipboard.copy(promoCodeToCopy);
  }
}
