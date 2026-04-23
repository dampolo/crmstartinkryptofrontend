import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { combineLatest, map, take } from 'rxjs';
import { AuthService } from '../main-services/auth-service';

export const authGuard: CanActivateFn = (route) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    return combineLatest([
        auth.isAuthenticated$,
        auth.userType$
    ]).pipe(
        take(1),
        map(([isLoggedIn, userType]) => {
            const allowedRoles = route.data?.['roles'] as string[];
            console.log(allowedRoles);

            // Not logged in
            if (!isLoggedIn) {
                return router.createUrlTree(
                    userType === 'business'
                        ? ['crm/login']
                        : ['kurse/login']
                );
            }

            // Logged in but no role yet (edge case)
            if (!userType) {
                return router.createUrlTree(['kurse/login']);
            }

            // Check role access
            if (allowedRoles && allowedRoles.includes(userType)) {
                return true;
            }

            // Logged in but not allowed
            return router.createUrlTree(['/']);
        })
    );
}
