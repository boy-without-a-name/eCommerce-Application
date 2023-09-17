import { Component } from '@angular/core';

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.scss'],
})
export class PromosComponent {
  promos = [
    { name: '10% off each cart item (for carts > 3000 USD)', code: 'massive-discount' },
    { name: 'name', code: 'code' },
  ];
}
