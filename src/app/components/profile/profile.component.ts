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

  isInvalid = {
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
  };

  firstNameInputBlurEventHandler(): void {
    const validationMsg: string | null = this.validateName('first', this.customer.firstName?.trim() as string);
    this.isInvalid.firstName = validationMsg;
  }

  lastNameInputBlurEventHandler(): void {
    const validationMsg: string = this.validateName('last', this.customer.lastName?.trim() as string);
    this.isInvalid.lastName = validationMsg;
  }

  emailInputBlurEventHandler(): void {
    const validationMsg: string = this.validateEmail(this.customer.email?.trim() as string);
    this.isInvalid.email = validationMsg;
  }

  dateOfBirthInputBlurEventHandler(): void {
    const validationMsg: string = this.validateDateOfBirth(this.customer.dateOfBirth?.trim() as string);
    this.isInvalid.dateOfBirth = validationMsg;
  }

  switchToEditMode(): void {
    this.editMode = true;
  }

  saveFormChanges(): void {
    // TODO: if there are no changes, do NOT send request & exit edit mode

    // Check whether all inputs are valid
    const allFieldsValid = !Object.values(this.isInvalid).some((invalidMsg) => invalidMsg.length !== 0);

    if (allFieldsValid)
      // Make request
      this.updateCustomer().subscribe({
        next: (response: DataUser) => {
          console.log(response);

          // Update data in store
          if (response.version) this.customer.version = response.version;
          localStorage.setItem('email', `${response.email}`);
          localStorage.setItem('version', `${response.version}`);
          localStorage.setItem('firstName', `${response.firstName}`);
          localStorage.setItem('lastName', `${response.lastName}`);
          localStorage.setItem('dateOfBirth', `${response.dateOfBirth}`);
          localStorage.setItem('shippingAddresses', JSON.stringify(this.customer.shippingAddresses));
          localStorage.setItem('billingAddresses', JSON.stringify(this.customer.billingAddresses));

          // Exit edit mode
          this.editMode = false;
        },
        error: (error) => {
          console.error('Error updating customer:', error);
        },
      });
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

  validateName(nameType: string, name: string): string {
    const minLength = 2;
    const maxLength = 50;

    if (!name) {
      if (nameType === 'first') return 'First name is required.';
      return 'Last name is required.';
    }

    if (name.length < minLength || name.length > maxLength) {
      if (nameType === 'first') return `First name should be between ${minLength} and ${maxLength} characters.`;
      return `Last name should be between ${minLength} and ${maxLength} characters.`;
    }

    return '';
  }

  validateEmail(email: string): string {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) {
      return 'Email address is required.';
    }

    if (!emailPattern.test(email)) {
      return 'Invalid email address format.';
    }

    return '';
  }

  validateDateOfBirth(dateOfBirth: string): string {
    const currentDate = new Date();
    const minimumAge = 13;

    const dob = new Date(dateOfBirth);

    if (!dateOfBirth) {
      return 'Date of birth is required.';
    }

    if (isNaN(dob.getTime())) {
      return 'Invalid date of birth format.';
    }

    const age =
      currentDate.getFullYear() -
      dob.getFullYear() -
      (currentDate.getMonth() < dob.getMonth() ||
      (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())
        ? 1
        : 0);

    if (age < minimumAge) {
      return `You must be at least ${minimumAge} years old.`;
    }

    return '';
  }
}
