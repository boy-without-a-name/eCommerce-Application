import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export function unauthenticatedGuard(): CanActivateFn {
  return () => {
    if (localStorage.getItem('id')) {
      return true;
    }
    inject(Router).navigate(['/']);
    return false;
  };
}
