import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromosComponent } from './promos.component';

describe('PromosComponent', () => {
  let component: PromosComponent;
  let fixture: ComponentFixture<PromosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromosComponent],
    });
    fixture = TestBed.createComponent(PromosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
