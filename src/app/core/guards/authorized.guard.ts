import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authorizedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthenticated = !!localStorage.getItem('Auth');

  if (isAuthenticated) {
    router.navigate(['/successfully']);
    return false;
  }

  return true;
};
