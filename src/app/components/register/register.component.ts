import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { AccessTokenResponse, IRegisterData } from '../../services/types';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  error: boolean = false;
  data: IRegisterData = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient,
              public service: RegisterService) {
  }

  onSubmit(event: Event){
    event.preventDefault();
  }
  ngOnInit(): void {
  }

  // data = this.service.register();


}
