import { Component, Input } from '@angular/core';
import { CardFilterInterface } from 'src/app/models/interface/results.filter.intreface';
import { GetProductService } from '../../services/getProduct/get-product.service';
import { CardEvent } from 'src/app/shared/class/cardEvent';

@Component({
  selector: 'app-card-filter',
  templateUrl: './card.component.html',
  styleUrls: ['../card-product/card.component.scss'],
})
export class CardFilterComponent {
  buttonPosition = false;
  constructor(
    public getProductService: GetProductService,
    private cardEvent: CardEvent,
  ) {}
  @Input() productfilter: CardFilterInterface;

  clickBtn(productId: string): void {
    this.cardEvent.clickBtn(productId);
    this.buttonPosition = true;
  }

  disabled(productId: string): boolean {
    return this.cardEvent.disabled(productId);
  }
}
