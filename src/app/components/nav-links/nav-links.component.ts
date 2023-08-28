import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/navService/nav.service';

@Component({
  selector: 'app-nav-links',
  templateUrl: './nav-links.component.html',
  styleUrls: ['./nav-links.component.scss'],
})
export class NavLinksComponent implements OnInit {
  constructor(private navService: NavService) {}

  isDisabled!: boolean;

  ngOnInit(): void {
    this.navService.isSignedInObservable$.subscribe((isSignedIn) => {
      this.isDisabled = isSignedIn;
    });
  }
}
