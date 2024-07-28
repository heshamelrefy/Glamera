import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const unauthorizedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthenticated = !!localStorage.getItem('Auth');

  if (!isAuthenticated) {
    router.navigate(['/registration']);
    return false;
  }

  return true;
};
