import { Component, OnInit } from '@angular/core';
import { RegisterService } from './services/register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'log-in';

  constructor(private anonym: RegisterService) {}

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.anonym.createToken();
    }
  }
}
