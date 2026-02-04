import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { combineLatest, map, take } from 'rxjs';
import { AuthService } from '../main-services/auth-service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

return combineLatest([
  auth.isAuthenticated,
  auth.userType$
]).pipe(
  take(1),
  map(([isLoggedIn, userType]) => {
    if (isLoggedIn) return true;

    return router.createUrlTree(
      userType === 'business'
        ? ['crm/login']
        : ['kurse/login']
    );
  })
);
};

