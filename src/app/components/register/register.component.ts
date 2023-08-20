import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccessTokenResponse } from '../../services/types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../../services/loginSevice/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  error: boolean = false;
  errorMsg: string = '';
  registrationForm: FormGroup;

  constructor(
    public service: RegisterService,
    private fb: FormBuilder,
    private http: HttpClient,
    private login: LoginService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-я]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-я]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/),
          Validators.pattern(/^[^\s].*[^\s]$/)
        ]
      ],
      date: ['', [Validators.required]],
      address: this.fb.group({
        city: ['', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-я]+$/)]],
        streetName: ['', [Validators.required]],
        streetNumber: ['', [Validators.required]],
        postalCode: ['', [Validators.required]]
      })
    });
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.registrationForm.value);
    if (this.registrationForm.valid) {
      const authToken = this.service.getToken();
      authToken?.subscribe((token: AccessTokenResponse) => {
        const access_token = token.access_token;
        const apiUrl = 'https://api.australia-southeast1.gcp.commercetools.com/arandomteam16/customers';
        const headers: HttpHeaders = new HttpHeaders({
          Authorization: `Bearer ${access_token}`,
          'Content-type': 'application/json'
        });
        const resp = this.http.post(apiUrl, this.registrationForm.value, {
          headers
        });
        resp.subscribe(
          (resp) => {
            this.login
              .getToken(this.registrationForm.value.email, this.registrationForm.value.password)
              ?.subscribe((next) => {
                this.router.navigate(['']);
              });
          },
          (error) => {
            this.errorMsg = error.error.message;
            this.error = true;
          }
        );
      });
    }
  }

  setErrorMsg(msg: string) {
    this.errorMsg = msg;
    this.error = true;
  }

  ngOnInit(): void {
  }
}
