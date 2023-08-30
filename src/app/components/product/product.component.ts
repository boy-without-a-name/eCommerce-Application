import { Component, OnInit } from '@angular/core';
import { GetProductService } from '../../services/getProduct/get-product.service';
import { Current, IProduct } from '../../models/interface/product.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  productView!: Current;
  id: string = '';
  loading = false;
  constructor(
    private product: GetProductService,
    private route: ActivatedRoute,
  ) {}

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
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);
      this.product.getProduct(this.id).subscribe((obj) => {
        this.productView = <Current>obj.masterData.current;
        this.loading = true;
      });
    });
  }
}
