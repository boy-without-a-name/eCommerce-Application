import { Component, Input } from '@angular/core';
import { ResultInterface } from 'src/app/models/interface/result.interfce';
import { GetProductService } from '../../services/getProduct/get-product.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  buttonPosition = false;
  constructor(public getProductService: GetProductService) {}
  @Input() product: ResultInterface;

  clickBtn(): void {
    this.buttonPosition = true;
  }
}
