import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/loginSevice/login.service';

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

  constructor(
    private token: LoginService,
    private router: Router,
  ) {}

  showPassword(a: string[]): string {
    if (this.showPasswordBoolean) {
      return a[1];
    }
    return a[0];
  }

  checkEmail(value: string): void {
    const str = value.split('@');
    if (
      str.length != 2 ||
      str[0].length == 0 ||
      str[1].split('.').length != 2 ||
      value.split('').filter((i) => i == '@').length > 1 ||
      value.split('').filter((i) => i === '.').length > 1 ||
      value.length !== value.trim().length
    ) {
      this.showErrorEmail = true;
    } else {
      this.showErrorEmail = false;
    }
  }
  checkPassword(value: string): string | void {
    this.checkRulesPassword = false;
    this.textErrorPasword = 'Неправильный формат пароля.';
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
      next: (responce) => {
        localStorage.setItem('token', `${responce.access_token}`);
        this.token.getUserData(localStorage.getItem('token'))?.subscribe((responce) => {
          localStorage.setItem('email', `${responce.email}`);
          localStorage.setItem('firstName', `${responce.firstName}`);
          localStorage.setItem('lastName', `${responce.lastName}`);
          this.router.navigate(['/']);
        });
      },
      error: () => {
        this.text = 'Неверный логин или пароль';
        this.checkClickBtnSubmit = false;
        this.checkRulesPassword = true;
      },
    });
  }
}
