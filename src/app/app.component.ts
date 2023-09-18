import { Component, OnInit } from '@angular/core';
import { AnonymousService } from './services/anonymous/anonymous';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'log-in';

  constructor(private anonym: AnonymousService) {}

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.anonym.getToken()?.subscribe((res)=>
      localStorage.setItem('token',`${res.access_token}`))
    }
  }
}
