import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // TODO: - [] get information of whether user was signed in or not from login component/service & change the isSignedIn condition accordingly
  isSignedIn = false;
}
