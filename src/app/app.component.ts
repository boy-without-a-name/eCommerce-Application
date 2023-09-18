import { Component, OnInit } from '@angular/core';
import { AnonymosService } from './services/anonymos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'log-in';

  constructor(private anonym: AnonymosService) {}

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.anonym.getToken()?.subscribe((res) => localStorage.setItem('token', `${res.access_token}`));
    }
  }
}
