import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { IRegisterData } from '../../services/types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  error: boolean = false;
  data: IRegisterData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: {
      streetName: '',
      streetNumber: '',
      postalCode: 213800,
      city: '',
      country: 'BY',
    },
  };

  constructor(public service: RegisterService) {}

  onSubmit(event: Event) {
    event.preventDefault();
  }

  ngOnInit(): void {}
}
