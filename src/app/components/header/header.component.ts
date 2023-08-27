import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isSignedIn = Boolean(localStorage.getItem('isSignedIn'));

  signOutEventHandler(): void {
    this.removeItemsFromLocalStorage(
      'token',
      'email',
      'firstName',
      'lastName',
      'isSignedIn',
      'shippingAddresses',
      'billingAddresses',
    );
    this.isSignedIn = false;
  }

  removeItemsFromLocalStorage(...items: string[]): void {
    for (const item of items) {
      localStorage.removeItem(item);
    }
  }
}
