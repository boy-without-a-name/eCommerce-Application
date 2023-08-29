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
    birthday: '2000-08-01',
    email: localStorage.getItem('email'),
    billingAddresses: JSON.parse(localStorage.getItem('billingAddresses') as string),
    shippingAddresses: JSON.parse(localStorage.getItem('shippingAddresses') as string),
  };

  editMode = {
    email: false,
  };

  switchEmailToEditMode(): void {
    this.editMode.email = true;
  }

  saveEditedEmail(): void {
    // request: update email
    // validate (use same validation as in register)
    this.editMode.email = false;
  }
}
