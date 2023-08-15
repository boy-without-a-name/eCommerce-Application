import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { AccessTokenResponse } from '../../services/types';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  error: boolean = false;

  constructor(private http: HttpClient,
              public service: RegisterService) {
  }



  ngOnInit(): void {
  }

  // data = this.service.register();

}
