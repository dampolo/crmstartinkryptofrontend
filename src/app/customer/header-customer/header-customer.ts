import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainStateService } from '../../main-services/main-state-service';
import { AuthService } from '../../main-services/auth-service';
import { Logo } from '../../shared/logo/logo';
import { DialogCustomer } from "../dialog-customer/dialog-customer";

@Component({
	selector: 'app-header-customer',
	imports: [DialogCustomer, CommonModule, Logo, DialogCustomer],
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
		this.router.navigate(["/kurse/login"])
		this.mainStateService.displayToast('Du bist erfolgreich abgemeldet', true)
	}

	showDialog() {
		this.mainStateService.isProfileVisible = true;
	}

	closeDialog() {
		this.mainStateService.isProfileVisible = false;
	}

	openMenu() {
		this.mainStateService.isMenuOpen.update(isOpen => !isOpen);
	}

	closeMenu() {
		this.mainStateService.isMenuOpen.set(false);
	}

}
