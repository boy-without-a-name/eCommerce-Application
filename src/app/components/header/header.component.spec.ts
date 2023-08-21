import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call removeItemsFromLocalStorage when sign out event is triggered', () => {
    const localStorageSpy = jest.spyOn(localStorage, 'removeItem');

    component.signOutEventHandler();

    expect(localStorageSpy).toHaveBeenCalledTimes(2);
    expect(localStorageSpy).toHaveBeenCalledWith('name');
    expect(localStorageSpy).toHaveBeenCalledWith('token');
  });
});
