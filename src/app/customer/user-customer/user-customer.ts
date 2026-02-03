import { Component, Inject, inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { stateService } from '../services/state-service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainStateService } from '../../main-services/main-state-service';

@Component({
    selector: 'app-user-customer',
    imports: [CommonModule],
    templateUrl: './user-customer.html',
    styleUrl: './user-customer.scss',
})
export class UserCustomer {

    mainStateService = inject(MainStateService);
    authService = inject(AuthService);

    constructor(private router: Router) {

    }
    logOut() {
        this.authService.logout()
        this.router.navigate(["/kurse/login"])
        this.mainStateService.isLoginPage = true;
        this.mainStateService.displayToast('Du bist erfolgreich abgemeldet', true)
        this.mainStateService.isProfileVisible = false
    }

    openProfile() {
        this.router.navigate(["/customer/customer-profile"])

    }

}
