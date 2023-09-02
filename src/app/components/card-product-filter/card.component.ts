import { Component, Input } from '@angular/core';
import { ResultInterface } from 'src/app/models/interface/result.interfce';
@Component({
  selector: 'app-card-filter',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardFilterComponent {
  buttonPosition = false;

  @Input() product: ResultInterface;

  clickBtn(): void {
    this.buttonPosition = true;
  }
}
