import { Component, Inject, inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { stateService } from '../services/state-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-customer',
    imports: [],
    templateUrl: './user-customer.html',
    styleUrl: './user-customer.scss',
})
export class UserCustomer {

    stateService = inject(stateService);
    authService = inject(AuthService);

    constructor(private router: Router) {

    }
    logOut() {
        this.authService.logout()
        this.router.navigate(["/login"])
        this.stateService.isLoginPage = true;
        this.stateService.displayToast('Du bist erfolgreich abgemeldet')
        this.stateService.isProfileVisible = false
    }

    openProfile() {

    }

}
