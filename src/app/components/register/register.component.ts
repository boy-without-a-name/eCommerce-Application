import { Component } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccessTokenResponse } from '../../services/types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../../services/loginSevice/login.service';
import { countries } from '../../models/interface/countries';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  error = false;
  errorMsg = '';
  errorMsgAge = false;
  registrationForm: FormGroup;
  showBilling = true;
  sumbitted = false;
  defaultShippingAddress = 0;
  countries = countries;

  constructor(
    public service: RegisterService,
    private fb: FormBuilder,
    private http: HttpClient,
    private login: LoginService,
    private router: Router,
  ) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-я]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-я]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      shippingAddresses: [''],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/),
          Validators.pattern(/^[^\s].*[^\s]$/),
        ],
      ],
      date: ['', [Validators.required]],
      addresses: this.fb.array([this.createAddressFormGroup()]),
    });
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.sumbitted = true;
    console.log(this.registrationForm.value);
    if (this.registrationForm.valid) {
      if (this.isOld()) {
        const authToken = this.service.getToken();
        authToken?.subscribe((token: AccessTokenResponse) => {
          const access_token = token.access_token;
          const apiUrl = 'https://api.australia-southeast1.gcp.commercetools.com/arandomteam16/customers';
          const headers: HttpHeaders = new HttpHeaders({
            Authorization: `Bearer ${access_token}`,
            'Content-type': 'application/json',
          });
          const resp = this.http.post(apiUrl, this.registrationForm.value, {
            headers,
          });
          resp.subscribe(
            (resp) => {
              console.log(resp);
              this.login
                .getToken(this.registrationForm.value.email, this.registrationForm.value.password)
                ?.subscribe((next) => {
                  console.log(next);
                  localStorage.setItem('email', `${this.registrationForm.value.email}`);
                  localStorage.setItem('firstName', `${this.registrationForm.value.firstName}`);
                  localStorage.setItem('lastName', `${this.registrationForm.value.lastName}`);
                  this.router.navigate(['/']);
                  this.router.navigate(['']);
                });
            },
            (error) => {
              this.errorMsg = error.error.message;
              this.error = true;
            },
          );
        });
      } else {
        this.error = true;
        this.errorMsgAge = true;
        this.errorMsg = 'You small :))';
      }
    }
  }

  createAddressFormGroup() {
    return this.fb.group({
      key: ['shipping', Validators.required],
      country: ['', Validators.required],
      city: ['', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-я]+$/)]],
      streetName: ['', [Validators.required]],
      streetNumber: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
    });
  }

  addAdress() {
    const newAddress = this.createAddressFormGroup();
    this.showBilling = false;
    this.adresses.push(newAddress);
  }

  removeAddress(index: number) {
    this.showBilling = true;
    this.adresses.removeAt(index);
    this.defaultShippingAddress = 0;
  }

  get adresses() {
    return this.registrationForm.get('addresses') as FormArray;
  }

  isOld() {
    const currentAge = 2023 - this.registrationForm.value.date.slice(0, 4);
    if (currentAge <= 13) {
      return false;
    } else {
      return true;
    }
  }

  defaultAddress(id: number) {
    this.registrationForm.value.defaultShippingAddressId = id;
    this.defaultShippingAddress = id;
  }
}
