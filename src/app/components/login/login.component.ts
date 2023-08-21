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
    this.textErrorPasword = 'Неправильный формат пароля.';
    let checkRulesPassword = false;
    if (value.length < 8) {
      this.textErrorPasword += ' Пароль должен быть не менее 8 символов.';
      checkRulesPassword = true;
    }
    const str = value.split('');
    for (let i = 0; i < str.length; i++) {
      if (str[i] == str[i].toUpperCase() && str[i] != ' ' && typeof str[i] != 'number') {
        break;
      }
      if (i + 1 == str.length) {
        this.textErrorPasword += ' Пароль должен содержать хотя бы одну заглавную букву.';
        checkRulesPassword = true;
      }
    }
    for (let i = 0; i < str.length; i++) {
      if (str[i] == str[i].toLowerCase() && str[i] != ' ') {
        break;
      }
      if (i + 1 == str.length) {
        this.textErrorPasword += ' Пароль должен содержать хотя бы одну строчную букву.';
        checkRulesPassword = true;
      }
    }
    for (let i = 0; i < str.length; i++) {
      if (!Object.is(Number(str[i]), NaN) && str[i] != ' ') {
        break;
      }
      if (i + 1 == str.length) {
        this.textErrorPasword += ' Пароль должен содержать как минимум одну цифру.';
        checkRulesPassword = true;
      }
    }
    if (value.trim().length !== value.length) {
      this.textErrorPasword += ' Пароль не должен содержать начальные или конечные пробелы.';
      checkRulesPassword = true;
    }
    if (checkRulesPassword === true) {
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
      error: () => alert('Неверный логин или пароль'),
    });
  }
}
