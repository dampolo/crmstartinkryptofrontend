import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { stateService } from '../services/state-service';
import { AuthService } from '../../main-services/auth-service';
import { CommonModule } from '@angular/common';
import { MainStateService } from '../../main-services/main-state-service';
import { Logo } from '../../shared/logo/logo';

@Component({
	standalone: true,
	selector: 'app-header-crm',
	imports: [CommonModule, Logo],
	templateUrl: './header-crm.html',
	styleUrl: './header-crm.scss'
})

export class HeaderCrm {
	mainStateService = inject(MainStateService);
	authService = inject(AuthService);
	posFixBurger = false;
	posFixLogo = false;

	constructor(private router: Router) {
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


	logOut() {
		this.authService.logout()
		this.router.navigate(["/crm/login"])
		this.mainStateService.isLoginPage = true;
		this.mainStateService.displayToast('Du bist erfolgreich abgemeldet', true)
	}
}
