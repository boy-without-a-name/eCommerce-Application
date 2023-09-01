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

  constructor(private catalog: CatalogService) {}

  ngOnInit(): void {
    this.catalog.getProgucts(localStorage.getItem('authTokenMain'))?.subscribe((res) => {
      this.result = res.results;
      console.log(res.results);
    });
  }
}
