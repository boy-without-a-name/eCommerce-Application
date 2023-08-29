import { Component, OnInit } from '@angular/core';
import { GetProductService } from '../../services/getProduct/get-product.service';
import { Current, IProduct } from '../../models/interface/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  productView!: Current;

  constructor(private product: GetProductService) {}

  // getProduct() {
  //   this.product.getProduct().subscribe((obj) => {
  //     if ('masterData' in obj) {
  //       const masterData = JSON.parse(JSON.stringify(obj.masterData));
  //       const current = masterData.current;
  //       Object.assign(this.productView, current);
  //       console.log(current);
  //     }
  //   });
  // }

  ngOnInit() {
    this.productView = <Current>this.product.getProductData();
    console.log(this.productView);
  }
}
