import { Component, Input } from '@angular/core';
import { ResultInterface } from 'src/app/models/interface/result.interfce';
import { GetProductService } from 'src/app/services/getProduct/get-product.service';
import { CardEvent } from 'src/app/shared/class/cardEvent';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  buttonPosition = false;
  constructor(
    private cardEvent: CardEvent,
    public getProductService: GetProductService,
  ) {}
  @Input() product: ResultInterface;

  clickBtn(productId: string): void {
    this.cardEvent.clickBtn(productId);
    this.buttonPosition = true;
  }

  disabled(productId: string): boolean {
    return this.cardEvent.disabled(productId);
  }
}
