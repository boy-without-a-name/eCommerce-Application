import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { IRegisterData } from './services/types';
import { RegisterService } from './services/register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'log-in';
  constructor(private registerService: RegisterService) {}
  ngOnInit() {
    this.registerService.createToken();
  }
  ngAfterViewInit() {}
}
