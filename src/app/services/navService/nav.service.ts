import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  private isSignedInSubject = new BehaviorSubject<boolean>(Boolean(localStorage.getItem('isSignedIn')));

  isSignedInObservable$ = this.isSignedInSubject.asObservable();

  setSignedInState(state: boolean): void {
    this.isSignedInSubject.next(state);
  }

  getSignedInState(): boolean {
    return this.isSignedInSubject.value;
  }
}
