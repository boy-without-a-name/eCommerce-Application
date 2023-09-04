import { AfterViewInit, Component, OnInit } from '@angular/core';
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
