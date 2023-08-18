import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { IRegisterData } from '../../services/types';
import { HttpClient } from '@angular/common/http';

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
  };

  constructor(public service: RegisterService) {}

  onSubmit(event: Event) {
    event.preventDefault();
  }

  ngOnInit(): void {}

}
