import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GetProductService } from '../../services/getProduct/get-product.service';
import { Current, Image } from '../../models/interface/product.interface';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PostModalImgComponent } from '../post-modal-img/post-modal-img.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, AfterViewInit {
  productView!: Current;
  id = '';
  loading = false;

  constructor(
    private product: GetProductService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.product.getProduct(this.id).subscribe((obj) => {
        this.productView = <Current>obj.masterData.current;
        console.log(this.productView);
        this.loading = true;
      });
    });
  }

  openPostModal(img: Image[], i: number): void {
    console.log(i);
    const dialogRef = this.dialog.open(PostModalImgComponent, {
      width: '600px',
      height: '500px',
      data: {
        img: img,
        index: i,
      },
    });
    dialogRef.afterClosed().subscribe((resp) => {
      console.log(resp);
    });
  }

  ngAfterViewInit(): void {}
}
