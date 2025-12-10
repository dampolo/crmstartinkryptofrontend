import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';
import { StateControl } from '../services/state-control';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const stateControl = inject(StateControl);
  

  return auth.isAuthenticated.pipe(
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true
      }
      router.navigate(['/login'])
      return false
    })
  )
};
