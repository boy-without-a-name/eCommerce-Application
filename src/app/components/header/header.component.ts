import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/navService/nav.service';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private navService: NavService,
    private registerService: RegisterService,
  ) {
    if (localStorage.getItem('isSignedIn')) {
      this.navService.setSignedInState(true);
    }
  }

  isSignedIn = Boolean(localStorage.getItem('isSignedIn'));

  signOutEventHandler(): void {
    this.navService.setSignedInState(false);
    this.navService.setSignedInState(false);
    this.removeItemsFromLocalStorage('token', 'email', 'firstName', 'lastName', 'isSignedIn');
    this.isSignedIn = false;
  }

  removeItemsFromLocalStorage(...items: string[]): void {
    for (const item of items) {
      localStorage.removeItem(item);
    }
  }
  ngOnInit() {}
}
