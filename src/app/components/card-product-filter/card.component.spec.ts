import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFilterComponent } from './card.component';

describe('CartComponent', () => {
  let component: CardFilterComponent;
  let fixture: ComponentFixture<CardFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardFilterComponent],
    });
    fixture = TestBed.createComponent(CardFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
