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

            // Not logged in
            if (!isLoggedIn || !userType) {
                console.log("TEST1");   
                return router.createUrlTree(["/kurse/login"])
            }
            // Check role access
            if (allowedRoles && allowedRoles.includes(userType)) {
                console.log("TEST2");
       
                return true;
            }
            // Logged in but not allowed
            // If customer want to get in to crm portal and will redirected 
            return router.createUrlTree(['/']);
        })
    );
}
