import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserCustomer } from '../user-customer/user-customer';
import { MainStateService } from '../../main-services/main-state-service';
import { AuthService } from '../../main-services/auth-service';
import { Logo } from '../../shared/logo/logo';

@Component({
	selector: 'app-header-customer',
	imports: [UserCustomer, CommonModule, Logo],
	templateUrl: './header-customer.html',
	styleUrl: './header-customer.scss',
})
export class HeaderCustomer {

	isProfileVisible = false

	mainStateService = inject(MainStateService);
	authService = inject(AuthService);
	posFixBurger = false;
	posFixLogo = false;

	constructor(private router: Router) {

	}
	logOut() {
		this.authService.logout()
		this.router.navigate(["/kurse/login"])
		this.mainStateService.isLoginPage = true;
		this.mainStateService.displayToast('Du bist erfolgreich abgemeldet', true)
	}

	showDialog() {
		this.mainStateService.isProfileVisible = true;
	}

	closeDialog() {
		this.mainStateService.isProfileVisible = false;
	}

		openMenu() {
		this.mainStateService.isMenuOpen = !this.mainStateService.isMenuOpen;
		this.posFixBurger = !this.posFixBurger;
		this.posFixLogo = !this.posFixLogo;
	}

	closeMenu() {
		this.mainStateService.isMenuOpen = false;
		this.posFixBurger = false;
		this.posFixLogo = false;
	}

}
