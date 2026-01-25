import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { stateService } from '../services/state-service';
import { AuthService } from '../services/auth-service';

@Component({
	selector: 'app-header-customer',
	imports: [],
	templateUrl: './header-customer.html',
	styleUrl: './header-customer.scss',
})
export class HeaderCustomer {


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

}
