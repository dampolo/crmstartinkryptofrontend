import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { CommonModule } from '@angular/common';
import { stateService } from '../services/state-service';
import { UserCustomer } from '../user-customer/user-customer';

@Component({
	selector: 'app-header-customer',
	imports: [UserCustomer, CommonModule],
	templateUrl: './header-customer.html',
	styleUrl: './header-customer.scss',
})
export class HeaderCustomer {

	isProfileVisible = false

	stateService = inject(stateService);
	authService = inject(AuthService);

	constructor(private router: Router) {

	}
	logOut() {
		this.authService.logout()
		this.router.navigate(["/login"])
		this.stateService.isLoginPage = true;
		this.stateService.displayToast('Du bist erfolgreich abgemeldet')
	}

	showDialog() {
        this.stateService.isProfileVisible = true;
    }

    closeDialog() {
        this.stateService.isProfileVisible = false;
    }

}
