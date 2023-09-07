import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GetProductService } from '../../services/getProduct/get-product.service';
import { Current, Image } from '../../models/interface/product.interface';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PostModalImgComponent } from '../post-modal-img/post-modal-img.component';
import { register } from 'swiper/element/bundle';
import Swiper from 'swiper';

register();

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  productView!: Current;
  id = '';
  loading = false;
  show = true;
  dataImg: Image[];
  @ViewChild('swiper') swiperRef: ElementRef<HTMLElement & { swiper?: Swiper } & { initialize: () => void }>;
  swiper?: Swiper;

  constructor(
    private product: GetProductService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    register();
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.product.getProduct(this.id).subscribe((obj) => {
        this.productView = <Current>obj.masterData.current;
        this.dataImg = this.productView.masterVariant.images;
        console.log(this.dataImg);
        console.log(this.productView);
        setTimeout(() => {
          this.loading = true;
          this.show = false;
        }, 2000);
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
}
