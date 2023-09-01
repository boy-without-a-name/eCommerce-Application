import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/navService/nav.service';
import { GetProductService } from '../../services/getProduct/get-product.service';


@Component({
  selector: 'app-nav-links',
  templateUrl: './nav-links.component.html',
  styleUrls: ['./nav-links.component.scss'],
})
export class NavLinksComponent implements OnInit {
  constructor(
    private navService: NavService,
    public product: GetProductService,
  ) {}

  isDisabled!: boolean;

  ngOnInit(): void {
    this.navService.isSignedInObservable$.subscribe((isSignedIn) => {
      this.isDisabled = isSignedIn;
    });
  }
}
