import { Component, Input } from '@angular/core';
import { CardFilterInterface } from 'src/app/models/interface/results.filter.intreface';
import { GetProductService } from '../../services/getProduct/get-product.service';
@Component({
  selector: 'app-card-filter',
  templateUrl: './card.component.html',
  styleUrls: ['../card-product/card.component.scss'],
})
export class CardFilterComponent {
  buttonPosition = false;
  constructor(public getProductService: GetProductService) {}
  @Input() productfilter: CardFilterInterface;

  clickBtn(): void {
    this.buttonPosition = true;
  }
}
