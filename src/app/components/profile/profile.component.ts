import { Component } from '@angular/core';
import { countries } from '../../models/interface/countries';
import { IAddress } from 'src/app/services/types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataUser } from 'src/app/models/interface/dataUser.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(private http: HttpClient) {}

  countries = countries;
  editMode = false;
  customer = {
    id: localStorage.getItem('id'),
    token: localStorage.getItem('token'),
    version: Number(localStorage.getItem('version')),
    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName'),
    dateOfBirth: localStorage.getItem('dateOfBirth'),
    email: localStorage.getItem('email'),
    billingAddresses: JSON.parse(localStorage.getItem('billingAddresses') as string) as IAddress[],
    shippingAddresses: JSON.parse(localStorage.getItem('shippingAddresses') as string) as IAddress[],
  };

  allValid = true;

  switchToEditMode(): void {
    this.editMode = true;
  }

  saveFormChanges(): void {
    // validate

    // make request
    if (this.allValid) {
      this.updateCustomer().subscribe({
        next: (response: DataUser) => {
          console.log(response);

          // update data in store
          if (response.version) this.customer.version = response.version;
          localStorage.setItem('email', `${response.email}`);
          localStorage.setItem('version', `${response.version}`);
          localStorage.setItem('firstName', `${response.firstName}`);
          localStorage.setItem('lastName', `${response.lastName}`);
          localStorage.setItem('dateOfBirth', `${response.dateOfBirth}`);
          localStorage.setItem('shippingAddresses', JSON.stringify(this.customer.shippingAddresses));
          localStorage.setItem('billingAddresses', JSON.stringify(this.customer.billingAddresses));

          // and exit edit mode
          this.editMode = false;
        },
        error: (error) => {
          console.error('Error updating customer:', error);
        },
      });
    }
  }

  updateCustomer(): Observable<DataUser> {
    const region = 'australia-southeast1';
    const projectKey = 'arandomteam16';
    const customerID = this.customer.id;
    const bearerToken = this.customer.token;

    const updateActions = [
      {
        action: 'setFirstName',
        firstName: this.customer.firstName,
      },
      {
        action: 'setLastName',
        lastName: this.customer.lastName,
      },
      {
        action: 'changeEmail',
        email: this.customer.email,
      },
      {
        action: 'setDateOfBirth',
        dateOfBirth: this.customer.dateOfBirth,
      },
    ];

    const requestBody = {
      version: this.customer.version,
      actions: updateActions,
    };

    const apiUrl = `https://api.${region}.gcp.commercetools.com/${projectKey}/customers/${customerID}`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${bearerToken}`,
    });

    return this.http.post(apiUrl, requestBody, { headers });
  }
}
