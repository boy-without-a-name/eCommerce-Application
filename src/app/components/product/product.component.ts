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

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.product.getProduct(this.id).subscribe((obj) => {
        this.productView = <Current>obj.masterData.current;
        this.loading = true;
      });
    });
  }
}