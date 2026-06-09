import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../main-services/auth-service';
import { CommonModule } from '@angular/common';
import { MainStateService } from '../../main-services/main-state-service';
import { Logo } from '../../shared/logo/logo';
import { DialogBusiness } from '../dialog-business/dialog-business';

@Component({
	standalone: true,
	selector: 'app-header-crm',
	imports: [CommonModule, Logo, DialogBusiness],
	templateUrl: './header-crm.html',
	styleUrl: './header-crm.scss'
})

export class HeaderCrm {
	mainStateService = inject(MainStateService);
	authService = inject(AuthService);
	
	openMenu() {
		this.mainStateService.isMenuOpen.update(isOpen => !isOpen);
	}

	closeMenu() {
		this.mainStateService.isMenuOpen.set(false);
	}

	showDialog() {
		this.mainStateService.isProfileVisible = true;
	}

	closeDialog() {
		this.mainStateService.isProfileVisible = false;
	}

}
