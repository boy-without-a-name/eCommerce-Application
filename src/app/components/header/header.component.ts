import { Component } from '@angular/core';
import { NavService } from 'src/app/services/navService/nav.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private navService: NavService,
    private registr: RegisterService,
  ) {
    if (localStorage.getItem('isSignedIn')) {
      this.navService.setSignedInState(true);
    }
  }

  isSignedIn = Boolean(localStorage.getItem('isSignedIn'));

  signOutEventHandler(): void {
    this.navService.setSignedInState(false);
    this.removeItemsFromLocalStorage(
      'id',
      'token',
      'email',
      'version',
      'firstName',
      'lastName',
      'isSignedIn',
      'addresses',
      'shippingAddressIds',
      'billingAddressIds',
      'dateOfBirth',
    );

    this.isSignedIn = false;
    this.registr.createToken();
  }

  removeItemsFromLocalStorage(...items: string[]): void {
    for (const item of items) {
      localStorage.removeItem(item);
    }
  }
}
