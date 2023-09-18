import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataUser } from 'src/app/models/interface/dataUser.interface';
import { LoginService } from 'src/app/services/loginSevice/login.service';
import { ReRecordCart } from 'src/app/shared/class/reRecordCart';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class AppLoginComponent {
  linkImg = [
    '../../../assets/img/password/free-icon-eye-159604.png',
    '../../../assets/img/password/free-icon-hide-2767146.png',
  ];
  typeInput = ['password', 'text'];
  showPasswordBoolean = false;
  showErrorEmail = false;
  textErrorPasword = '';
  text = '';
  checkRulesPassword = false;
  englishAlphabet = 'abcdefghijklmnopqrstuvwxyz';
  checkClickBtnSubmit = false;
  errorAuthText = false;
  textErrorEmail = '';

  constructor(
    private token: LoginService,
    private router: Router,
    private replice: ReRecordCart,
  ) {}

  showPassword(a: string[]): string {
    if (this.showPasswordBoolean) {
      return a[1];
    }
    return a[0];
  }

  checkEmail(value: string): string | void {
    const str = value.split('@');
    this.showErrorEmail = false;
    this.textErrorEmail = '';
    if (str.length === 1) {
      this.showErrorEmail = true;
      if (str[0].length === 0 || str[0] === '') {
        this.textErrorEmail = 'Поле до символа @ должно содержать минимум 1 символ';
        return this.textErrorEmail;
      }
      if (str[0].split('').filter((i) => i === '.').length > 0) {
        this.textErrorEmail = 'Поле до символа @ не должно содержать точку';
        return this.textErrorEmail;
      }
      if (str[0].length !== str[0].trim().length) {
        this.textErrorEmail = 'Поле не должно содержать пробелы в начале или конце';
        return this.textErrorEmail;
      }
      return (this.textErrorEmail = 'Заполните поле по образу user@example.com');
    } else if (str.length === 2) {
      if (str[0].length === 0) {
        this.textErrorEmail = 'Поле до символа @ должно содержать минимум 1 символ';
        this.showErrorEmail = true;
        return this.textErrorEmail;
      }
      if (str[0].split('').filter((i) => i === '.').length > 0) {
        this.textErrorEmail = 'Поле до символа @ не должно содержать точку';
        this.showErrorEmail = true;
        return this.textErrorEmail;
      }
      const domen = str[1].split('.');
      if (domen.length === 1 || domen[0].length === 0 || domen[1].length === 0) {
        this.textErrorEmail = 'Заполните имя домена по образцу example.com';
        this.showErrorEmail = true;
        return this.textErrorEmail;
      } else {
        this.showErrorEmail = false;
      }
      if (value.length !== value.trim().length) {
        this.textErrorEmail = 'Поле не должно содержать пробелы в начале или конце';
        this.showErrorEmail = true;
        return this.textErrorEmail;
      }
      if (str[1].split('.').length != 2) {
        this.textErrorEmail = 'Имя домена должно содеражать только 1 точку';
        this.showErrorEmail = true;
        return this.textErrorEmail;
      }
    } else if (str.length > 2) {
      this.textErrorEmail = 'Поле не должно содержать более одного символа @';
      this.showErrorEmail = true;
      return this.textErrorEmail;
    } else {
      this.showErrorEmail = false;
    }
  }

  checkPassword(value: string): string | void {
    this.checkRulesPassword = false;
    this.textErrorPasword = 'Слабый пароль.';
    if (value.length < 8) {
      this.textErrorPasword += ' Пароль должен быть не менее 8 символов.';
      this.checkRulesPassword = true;
    }
    if (value.length === 0) {
      this.textErrorPasword +=
        ' Пароль должен содержать хотя бы одну заглавную букву (A-Z).' +
        ' Пароль должен содержать хотя бы одну строчную букву (a-z).' +
        ' Пароль должен содержать как минимум одну цифру.';
      this.checkRulesPassword = true;
    }
    const str = value.split('');
    const englishAlphabetUpper = this.englishAlphabet.toUpperCase().split('');
    const englishAlphabetLower = this.englishAlphabet.split('');
    for (let i = 0; i < str.length; i++) {
      let symbol = false;
      for (let y = 0; y < englishAlphabetUpper.length; y++) {
        if (str[i] === englishAlphabetUpper[y]) {
          symbol = true;
          break;
        }
        if (i + 1 == str.length && y + 1 === englishAlphabetUpper.length) {
          this.textErrorPasword += ' Пароль должен содержать хотя бы одну заглавную букву (A-Z).';
          this.checkRulesPassword = true;
        }
      }
      if (symbol) {
        break;
      }
    }
    for (let i = 0; i < str.length; i++) {
      let symbol = false;
      for (let y = 0; y < englishAlphabetLower.length; y++) {
        if (str[i] === englishAlphabetLower[y]) {
          symbol = true;
          break;
        }
        if (i + 1 == str.length && y + 1 === englishAlphabetLower.length) {
          this.textErrorPasword += ' Пароль должен содержать хотя бы одну строчную букву (a-z).';
          this.checkRulesPassword = true;
        }
      }
      if (symbol) {
        break;
      }
    }
    for (let i = 0; i < str.length; i++) {
      if (!Object.is(Number(str[i]), NaN) && str[i] != ' ') {
        break;
      }
      if (i + 1 == str.length) {
        this.textErrorPasword += ' Пароль должен содержать как минимум одну цифру.';
        this.checkRulesPassword = true;
      }
    }
    if (value.trim().length !== value.length) {
      this.textErrorPasword += ' Пароль не должен содержать начальные или конечные пробелы.';
      this.checkRulesPassword = true;
    }
    if (this.checkRulesPassword === true) {
      return (this.text = this.textErrorPasword);
    } else {
      this.text = '';
    }
  }
  clickButtonSubmit(email: string, password: string): void {
    this.token.getToken(email, password)?.subscribe({
      next: (response) => {
        console.log(response);
        localStorage.setItem('token', `${response.access_token}`);

        this.token.getUserData(localStorage.getItem('token'))?.subscribe((response: DataUser) => {
          console.log(response);

          const addresses = response.addresses;
          const billingAddressIds = response.billingAddressIds;
          const shippingAddressIds = response.shippingAddressIds;

          localStorage.setItem('id', `${response.id}`);
          localStorage.setItem('email', `${response.email}`);
          localStorage.setItem('version', `${response.version}`);
          localStorage.setItem('firstName', `${response.firstName}`);
          localStorage.setItem('lastName', `${response.lastName}`);
          localStorage.setItem('isSignedIn', JSON.stringify(true));
          localStorage.setItem('billingAddressIds', JSON.stringify(billingAddressIds));
          localStorage.setItem('shippingAddressIds', JSON.stringify(shippingAddressIds));
          localStorage.setItem('addresses', JSON.stringify(addresses));
          localStorage.setItem('dateOfBirth', `${response.dateOfBirth}`);
          this.replice.reRecordCart();
          this.router.navigate(['/']);
        });
      },
      error: () => {
        this.errorAuthText = true;
        this.checkClickBtnSubmit = false;
      },
    });
  }
}
