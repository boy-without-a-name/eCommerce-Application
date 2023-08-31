import { Component } from '@angular/core';
import { countries } from '../../models/interface/countries';
import { IAddress } from 'src/app/services/types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataUser } from 'src/app/models/interface/dataUser.interface';
import { Observable } from 'rxjs';

import { validateName, validateDateOfBirth, validateEmail, validatePassword } from './validators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(private http: HttpClient) {}

  countries = countries;
  editMode = false;
  changePassMode = false;
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
    password: {
      current: '',
      new: '',
      newRepeated: '',
    },
  };

  isInvalid = {
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
  };

  isPasswordInvalid = {
    current: '',
    new: '',
    newRepeated: '',
  };

  switchToChangePassMode(): void {
    this.changePassMode = true;
  }

  switchToEditMode(): void {
    this.editMode = true;
  }

  savePasswordChanges(): void {
    const allPasswordsValid = !Object.values(this.isPasswordInvalid).some((passInvalidMsg) => passInvalidMsg !== '');

    if (allPasswordsValid)
      this.changePassword().subscribe({
        next: (response) => {
          console.log(response);
          // update customer version
          if (response.version) this.customer.version = response.version;
          this.changePassMode = false;
          // reset pass data
          this.customer.password.current = '';
          this.customer.password.new = '';

          // TODO: re-authentication (new token needed)
        },
        error: (errorResponse) => {
          if (errorResponse.error.statusCode === 400) this.isPasswordInvalid.current = errorResponse.error.message;
          console.error('Error changing password:', errorResponse);
        },
      });
  }

  saveFormChanges(): void {
    // TODO: if there are no changes, do NOT send request & exit edit mode

    // Check whether all inputs are valid
    const allFieldsValid = !Object.values(this.isInvalid).some((invalidMsg) => invalidMsg.length !== 0);

    if (allFieldsValid) {
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
  }

  updateCustomer(): Observable<DataUser> {
    const region = 'australia-southeast1';
    const projectKey = 'arandomteam16';
    const customerID = this.customer.id;
    const BEARER_TOKEN = this.customer.token;

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
      Authorization: `Bearer ${BEARER_TOKEN}`,
    });

    return this.http.post(apiUrl, requestBody, { headers });
  }

  changePassword(): Observable<DataUser> {
    const region = 'australia-southeast1';
    const projectKey = 'arandomteam16';
    const BEARER_TOKEN = this.customer.token;

    const apiUrl = `https://api.${region}.gcp.commercetools.com/${projectKey}/customers/password`;
    const requestBody = {
      id: this.customer.id,
      version: this.customer.version,
      currentPassword: String(this.customer.password.current),
      newPassword: String(this.customer.password.new),
    };
    const headers = new HttpHeaders({
      Authorization: `Bearer ${BEARER_TOKEN}`,
      'Content-Type': 'application / json',
    });

    return this.http.post(apiUrl, requestBody, { headers });
  }

  validateFirstNameInput(): void {
    const validationMsg: string | null = validateName('first', this.customer.firstName?.trim() as string);
    this.isInvalid.firstName = validationMsg;
  }

  validateLastNameInput(): void {
    const validationMsg: string = validateName('last', this.customer.lastName?.trim() as string);
    this.isInvalid.lastName = validationMsg;
  }

  validateEmailInput(): void {
    const validationMsg: string = validateEmail(this.customer.email?.trim() as string);
    this.isInvalid.email = validationMsg;
  }

  validateDateOfBirthInput(): void {
    const validationMsg: string = validateDateOfBirth(this.customer.dateOfBirth?.trim() as string);
    this.isInvalid.dateOfBirth = validationMsg;
  }

  validatePassCurrentInput(): void {
    const validationMsg: string = validatePassword(this.customer.password.current as string);
    this.isPasswordInvalid.current = validationMsg;
  }

  validatePassNewInput(): void {
    const validationMsg: string = validatePassword(this.customer.password.new as string);
    this.isPasswordInvalid.new = validationMsg;
  }
}
