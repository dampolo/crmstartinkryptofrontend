import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../crm/services/auth-service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthenticated.pipe(
    map(isLoggedIn => {
      if(isLoggedIn) {
        return true;
      } else {
        return router.createUrlTree(['/login'])
      }
    })
  );    
};

