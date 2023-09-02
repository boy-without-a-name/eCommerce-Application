import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog/catalog.service';
import { ResultInterface } from 'src/app/models/interface/result.interfce';
import { CardFilterInterface } from 'src/app/models/interface/results.filter.intreface';
import { ProducrTypeId } from 'src/app/models/enums/productTypeId.enum';

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
  minPrice = '';
  maxPrice = '';

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
      this.filterCategory.push(ProducrTypeId.phone);
    } else {
      this.filterCategory.splice(this.filterCategory.indexOf(ProducrTypeId.phone), 1);
    }
  }

  clickTablet(value: boolean): void {
    if (value) {
      this.filterCategory.push(ProducrTypeId.tablet);
    } else {
      this.filterCategory.splice(this.filterCategory.indexOf(ProducrTypeId.tablet), 1);
    }
  }

  clickLaptop(value: boolean): void {
    if (value) {
      this.filterCategory.push(ProducrTypeId.laptop);
    } else {
      this.filterCategory.splice(this.filterCategory.indexOf(ProducrTypeId.laptop), 1);
    }
  }

  clickWatch(value: boolean): void {
    if (value) {
      this.filterCategory.push(ProducrTypeId.watch);
    } else {
      this.filterCategory.splice(this.filterCategory.indexOf(ProducrTypeId.watch), 1);
    }
  }

  getMinPrice(value: string): string {
    return (this.minPrice = value.trim());
  }

  getMaxPrice(value: string): string {
    return (this.maxPrice = value.trim());
  }

  clickSave(): void {
    let str = '';
    if (this.filterCategory.length > 0) {
      str += 'filter=productType.id:' + this.filterCategory.join(',');
    }
    if (this.minPrice !== '' && this.maxPrice !== '') {
      let min = '';
      let max = '';
      if (this.minPrice === '') {
        min = '*';
      } else {
        min = (Number(this.minPrice) * 100).toString();
      }
      if (this.maxPrice === '') {
        max = '*';
      } else {
        max = (Number(this.maxPrice) * 100).toString();
      }
      if (str !== '') {
        str += '&';
      }
      str += `filter=variants.price.centAmount:range (${min} to ${max})`;
    }
    this.filterEnabled = true;

    this.catalog.test(localStorage.getItem('token'), str)?.subscribe((res) => (this.productfilter = res.results));
  }

  clickReset(): void {
    this.minPrice = '';
    this.maxPrice = '';
    this.filterEnabled = false;
    this.filterCategory = [];
  }
}
