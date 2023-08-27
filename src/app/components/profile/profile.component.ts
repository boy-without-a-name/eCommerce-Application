import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user = {
    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName'),
    email: localStorage.getItem('email'),
    billingAddresses: JSON.parse(localStorage.getItem('billingAddresses') as string),
    shippingAddresses: JSON.parse(localStorage.getItem('shippingAddresses') as string),
  };
}
