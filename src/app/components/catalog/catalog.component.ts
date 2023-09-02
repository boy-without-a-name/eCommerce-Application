import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog/catalog.service';
import { ResultInterface } from 'src/app/models/interface/result.interfce';
import { CardFilterInterface } from 'src/app/models/interface/results.filter.intreface';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  result: ResultInterface[] = [];
  filterCategory: string[] = [];
  filterEnabled = false;
  productfilter: CardFilterInterface[];

  constructor(private catalog: CatalogService) {}

  ngOnInit(): void {
    if (localStorage.getItem('email') == (null || undefined)) {
      this.catalog.getToken()?.subscribe({
        next: (responce) => {
          localStorage.setItem('token', `${responce.access_token}`);
        },
        error: () => {
          console.log('error');
        },
      });
    }
    this.catalog.getProgucts(localStorage.getItem('token'))?.subscribe((res) => {
      this.result = res.results;
      console.log(res.results);
    });
  }

  clickPhone(value: boolean): void {
    if (value) {
      this.filterCategory.push('c71e3588-7aee-423e-97cb-9f9b46de215e');
    } else {
      this.filterCategory.splice(this.filterCategory.indexOf('c71e3588-7aee-423e-97cb-9f9b46de215e'), 1);
    }
  }

  clickTablet(value: boolean): void {
    if (value) {
      this.filterCategory.push('5c537762-8efb-46bc-9bec-6ef0ac96f5dc');
    } else {
      this.filterCategory.splice(this.filterCategory.indexOf('5c537762-8efb-46bc-9bec-6ef0ac96f5dc'), 1);
    }
  }

  clickLaptop(value: boolean): void {
    if (value) {
      this.filterCategory.push('f4c79eeb-64d9-4fb5-a55e-2f18a9afdc54');
    } else {
      this.filterCategory.splice(this.filterCategory.indexOf('f4c79eeb-64d9-4fb5-a55e-2f18a9afdc54'), 1);
    }
  }
  clickWatch(value: boolean): void {
    if (value) {
      this.filterCategory.push('f0fd682d-ac22-4b4b-a16b-dc53fcb87c77');
    } else {
      this.filterCategory.splice(this.filterCategory.indexOf('f0fd682d-ac22-4b4b-a16b-dc53fcb87c77'), 1);
    }
  }

  clickSave(): void {
    let str = 'filter=productType.id:';
    for (let i = 0; i < this.filterCategory.length; i++) {
      if (i + 1 === this.filterCategory.length) {
        str += `"${this.filterCategory[i]}"`;
      } else {
        str += `"${this.filterCategory[i]}",`;
      }
    }
    // const filterRes: ResultInterface[] = [];
    // if (this.filterCategory.length > 0) {
    //   this.catalog.getProgucts(localStorage.getItem('token'))?.subscribe((res) => {
    //     res.results.forEach((item) => {
    //       this.filterCategory.forEach((category) => {
    //         if (item.productType.id === category) {
    //           filterRes.push(item);
    //         }
    //       });
    //     });
    //     this.result = filterRes;
    //   });

    // }
    this.filterEnabled = true;
    console.log(str);
    this.catalog.test(localStorage.getItem('token'), str)?.subscribe((res) => (this.productfilter = res.results));
  }
}
