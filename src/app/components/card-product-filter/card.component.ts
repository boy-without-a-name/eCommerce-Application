import { Component, Input } from '@angular/core';
import { CardFilterInterface } from 'src/app/models/interface/results.filter.intreface';
@Component({
  selector: 'app-card-filter',
  templateUrl: './card.component.html',
  styleUrls: ['../card-product/card.component.scss'],
})
export class CardFilterComponent {
  buttonPosition = false;

  @Input() productfilter: CardFilterInterface;

  clickBtn(): void {
    this.buttonPosition = true;
  }
}
