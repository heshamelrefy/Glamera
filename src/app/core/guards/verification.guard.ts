import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const verificationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isVerified = !!localStorage.getItem('isVerified');
  if (!isVerified) {
    router.navigate(['/registration']);
    return false;
  }

  return true;
};
