import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog/catalog.service';
import { ResultInterface } from 'src/app/models/interface/result.interfce';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  result: ResultInterface[] = [];
  filterCategory: number[] = [];

  constructor(private catalog: CatalogService) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') == (null || undefined)) {
      this.catalog.getToken()?.subscribe({
        next: (responce) => {
          localStorage.setItem('token', `${responce.access_token}`);
          this.catalog.getProgucts(localStorage.getItem('token'))?.subscribe((res) => console.log(res));
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
      this.filterCategory.push(1);
    } else {
      this.filterCategory.splice(this.filterCategory.indexOf(1), 1);
    }
  }

  clickTablet(value: boolean): void {
    if (value) {
      this.filterCategory.push(3);
    } else {
      this.filterCategory.splice(this.filterCategory.indexOf(3), 1);
    }
  }

  clickLaptop(value: boolean): void {
    if (value) {
      this.filterCategory.push(2);
    } else {
      this.filterCategory.splice(this.filterCategory.indexOf(2), 1);
    }
  }
  clickWatch(value: boolean): void {
    if (value) {
      this.filterCategory.push(4);
    } else {
      this.filterCategory.splice(this.filterCategory.indexOf(4), 1);
    }
  }

  clickSave(value: boolean): void {
    console.log(value);
  }
}
