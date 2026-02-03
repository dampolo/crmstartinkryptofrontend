import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { CommonModule } from '@angular/common';
import { stateService } from '../services/state-service';
import { UserCustomer } from '../user-customer/user-customer';
import { MainStateService } from '../../main-services/main-state-service';

@Component({
	selector: 'app-header-customer',
	imports: [UserCustomer, CommonModule],
	templateUrl: './header-customer.html',
	styleUrl: './header-customer.scss',
})
export class HeaderCustomer {

	isProfileVisible = false

	mainStateService = inject(MainStateService);
	authService = inject(AuthService);

	constructor(private router: Router) {

	}
	logOut() {
		this.authService.logout()
		this.router.navigate(["/courses/login"])
		this.mainStateService.isLoginPage = true;
		this.mainStateService.displayToast('Du bist erfolgreich abgemeldet', true)
	}

	showDialog() {
        this.mainStateService.isProfileVisible = true;
    }

    closeDialog() {
        this.mainStateService.isProfileVisible = false;
    }

}
