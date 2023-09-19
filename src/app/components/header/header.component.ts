import { Component } from '@angular/core';
import { AnonymosService } from 'src/app/services/anonymos';
import { NavService } from 'src/app/services/navService/nav.service';
import { ReRecordCart } from 'src/app/shared/class/reRecordCart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private navService: NavService,
    private anonym: AnonymosService,
    private replice: ReRecordCart,
  ) {
    if (localStorage.getItem('isSignedIn')) {
      this.navService.setSignedInState(true);
    }
  }

  isMenuActive: boolean;
  isSignedIn = Boolean(localStorage.getItem('isSignedIn'));

  toggleMenu(): void {
    if (this.isMenuActive) {
      this.isMenuActive = false;
    } else {
      this.isMenuActive = true;
    }
  }

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
    this.anonym.getToken()?.subscribe((res) => {
      localStorage.setItem('token', `${res.access_token}`);
      this.replice.reRecordCart();
    });
  }

  removeItemsFromLocalStorage(...items: string[]): void {
    for (const item of items) {
      localStorage.removeItem(item);
    }
  }
}
