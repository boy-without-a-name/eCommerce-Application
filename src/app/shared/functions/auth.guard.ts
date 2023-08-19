import {  CanActivateFn, Router} from "@angular/router";
import {  inject } from "@angular/core";

export function authenticationGuard(): CanActivateFn {
  return () => {
    if(!localStorage.getItem('token')) {
      return true;
    }
    inject(Router).navigate(['/'])
    return false;
  };
}
