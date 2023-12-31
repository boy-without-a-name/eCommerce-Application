import { Component, OnInit } from '@angular/core';
import { countries } from '../../models/interface/countries';
import { IAddress } from '../../models/interface/address.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataUser } from 'src/app/models/interface/dataUser.interface';
import { Observable } from 'rxjs';
import Toastify from 'toastify-js';
import { compareAddressesArrays } from './compareAddressesArrays';
import { validateName, validateDateOfBirth, validateEmail, validatePassword } from './validators';
import { UpdateAction } from 'src/app/models/interface/updateAction';
import { LoginService } from 'src/app/services/loginSevice/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private login: LoginService,
  ) {}

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
    addresses: JSON.parse(localStorage.getItem('addresses') as string) as IAddress[],
    billingAddressIds: JSON.parse(localStorage.getItem('billingAddressIds') as string),
    shippingAddressIds: JSON.parse(localStorage.getItem('shippingAddressIds') as string),
    password: {
      current: '',
      new: '',
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
  };

  setAddressTypes(): void {
    this.customer.addresses.forEach((addressEl) => {
      addressEl.type = [];
      if (this.customer.shippingAddressIds.includes(addressEl.id)) {
        addressEl.type.push('shipping');
      }
      if (this.customer.billingAddressIds.includes(addressEl.id)) {
        addressEl.type.push('billing');
      }
      if (
        this.customer.billingAddressIds.includes(addressEl.id) &&
        this.customer.shippingAddressIds.includes(addressEl.id)
      ) {
        addressEl.type.push('billing', 'shipping');
      }
    });
  }

  switchToChangePassMode(): void {
    this.changePassMode = true;
  }

  exitChangePassMode(): void {
    this.editMode = false;
    this.changePassMode = false;
    this.customer.password.current = '';
    this.customer.password.new = '';
    this.isPasswordInvalid.current = '';
    this.isPasswordInvalid.new = '';
  }

  switchToEditMode(): void {
    this.editMode = true;
  }

  handleDeleteAddress(addressToDeleteId: string | undefined): void {
    this.deleteAddress(addressToDeleteId).subscribe({
      next: (response: DataUser) => {
        // Update data
        if (response.addresses) this.customer.addresses = response.addresses;
        if (response.shippingAddressIds) this.customer.shippingAddressIds = response.shippingAddressIds;
        if (response.billingAddressIds) this.customer.billingAddressIds = response.billingAddressIds;
        localStorage.setItem('addresses', JSON.stringify(this.customer.addresses));
        localStorage.setItem('shippingAddressIds', JSON.stringify(response.shippingAddressIds));
        localStorage.setItem('billingAddressIds', JSON.stringify(response.billingAddressIds));

        // update customer version
        if (response.version) this.customer.version = response.version;

        this.setAddressTypes();

        this.editMode = false;
        Toastify({
          text: 'Address deleted',
          style: {
            background: 'lightgreen',
            padding: '0.2rem 0.5rem',
            'text-align': 'center',
            'border-radius': '4px',
            'font-weight': '600',
          },
        }).showToast();
      },
      error: (err) => {
        console.error('Error deleting address:', err);
        Toastify({
          text: 'Error deleting address',
          style: {
            position: 'fixed',
            left: '10px',
            background: 'lightcoral',
            padding: '0.2rem 0.5rem',
            'text-align': 'center',
            'border-radius': '4px',
            'font-weight': '600',
          },
        }).showToast();
      },
    });
  }

  deleteAddress(addressToDeleteId: string | undefined): Observable<DataUser> {
    const region = 'australia-southeast1';
    const projectKey = 'arandomteam16';
    const customerID = this.customer.id;
    const BEARER_TOKEN = this.customer.token;

    const updateActions = [
      {
        action: 'removeAddress',
        addressId: addressToDeleteId,
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

  savePasswordChanges(): void {
    const allPasswordsValid = !Object.values(this.isPasswordInvalid).some((passInvalidMsg) => passInvalidMsg !== '');
    const passwordInputsNotEmpty =
      this.customer.password.current.length !== 0 && this.customer.password.new.length !== 0;

    this.validatePassCurrentInput();
    this.validatePassNewInput();

    if (allPasswordsValid && passwordInputsNotEmpty)
      this.changePassword().subscribe({
        next: (response) => {
          // update customer version
          if (response.version) this.customer.version = response.version;
          this.changePassMode = false;

          // get new token
          this.login.getToken(this.customer.email as string, this.customer.password.new)?.subscribe({
            next: (response) => {
              this.customer.token = response.access_token as string;
              localStorage.setItem('token', `${response.access_token}`);
            },
            error: (errorResponse) => {
              console.log(errorResponse.error.message);
            },
          });

          Toastify({
            text: 'New password has been set',
            style: {
              background: 'lightgreen',
              padding: '0.2rem 0.5rem',
              'text-align': 'center',
              'border-radius': '4px',
              'font-weight': '600',
            },
          }).showToast();

          this.customer.password.current = '';
          this.customer.password.new = '';
        },
        error: (errorResponse) => {
          if (errorResponse.error.statusCode === 400) this.isPasswordInvalid.current = errorResponse.error.message;
          console.error('Error changing password:', errorResponse);
          Toastify({
            text: errorResponse.error.message,
            style: {
              background: 'lightcoral',
              padding: '0.2rem 0.5rem',
              'text-align': 'center',
              'border-radius': '4px',
              'font-weight': '600',
            },
          }).showToast();
        },
      });
  }

  saveFormChanges(): void {
    // Check whether all inputs are valid
    const allFieldsValid = !Object.values(this.isInvalid).some((invalidMsg) => invalidMsg.length !== 0);
    // Check for any changes in inputs
    const fieldsNotChanged =
      this.customer.firstName?.trim() === localStorage.getItem('firstName')?.trim() &&
      this.customer.lastName?.trim() === localStorage.getItem('lastName')?.trim() &&
      this.customer.dateOfBirth?.trim() === localStorage.getItem('dateOfBirth')?.trim() &&
      this.customer.email?.trim() === localStorage.getItem('email')?.trim() &&
      compareAddressesArrays(this.customer.addresses, JSON.parse(localStorage.getItem('addresses') as string));

    if (fieldsNotChanged) {
      this.editMode = false;
    } else {
      if (allFieldsValid) {
        // Make request
        this.updateCustomer().subscribe({
          next: (response: DataUser) => {
            // Update data in store
            if (response.version) this.customer.version = response.version;
            localStorage.setItem('email', `${response.email?.trim()}`);
            localStorage.setItem('version', `${response.version}`);
            localStorage.setItem('firstName', `${response.firstName?.trim()}`);
            localStorage.setItem('lastName', `${response.lastName?.trim()}`);
            localStorage.setItem('dateOfBirth', `${response.dateOfBirth?.trim()}`);
            localStorage.setItem('addresses', JSON.stringify(response.addresses));
            localStorage.setItem('billingAddressIds', JSON.stringify(response.billingAddressIds));
            localStorage.setItem('shippingAddressIds', JSON.stringify(response.shippingAddressIds));

            this.setAddressTypes();

            // Exit edit mode
            this.editMode = false;

            // Show success toast message
            Toastify({
              text: 'Changes saved!',
              style: {
                background: 'lightgreen',
                padding: '0.2rem 0.5rem',
                'text-align': 'center',
                'border-radius': '4px',
                'font-weight': '600',
              },
            }).showToast();
          },
          error: (error) => {
            console.error('Error updating customer:', error);
            if (error.error.message === 'There is already an existing customer with the provided email.') {
              this.isInvalid.email = 'Email is already registered';
            }

            // Show error toast message
            Toastify({
              text: `${error.error.message}`,
              style: {
                background: 'lightcoral',
                padding: '0.2rem 0.5rem',
                'text-align': 'center',
                'border-radius': '4px',
                'font-weight': '600',
              },
            }).showToast();
          },
        });
      }
    }
  }

  getUpdActionObjectsForAddresses(): UpdateAction[] {
    const updateActionObjectsForAddresses = this.customer.addresses.map((address: IAddress): UpdateAction => {
      return {
        action: 'changeAddress',
        addressId: address.id,
        address: {
          postalCode: address.postalCode,
          country: address.country,
          streetName: address.streetName,
          streetNumber: address.streetNumber,
          city: address.city,
        },
      };
    });
    return updateActionObjectsForAddresses;
  }

  updateCustomer(): Observable<DataUser> {
    const region = 'australia-southeast1';
    const projectKey = 'arandomteam16';
    const customerID = this.customer.id;
    const BEARER_TOKEN = this.customer.token;

    const updateActions: UpdateAction[] = [
      {
        action: 'setFirstName',
        firstName: String(this.customer.firstName),
      },
      {
        action: 'setLastName',
        lastName: String(this.customer.lastName),
      },
      {
        action: 'changeEmail',
        email: String(this.customer.email),
      },
      {
        action: 'setDateOfBirth',
        dateOfBirth: String(this.customer.dateOfBirth),
      },
    ];

    const updActForAddresses = this.getUpdActionObjectsForAddresses();

    updActForAddresses.forEach((updAction) => {
      updateActions.push(updAction as UpdateAction);
    });

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

  ngOnInit(): void {
    this.setAddressTypes();
  }
}
