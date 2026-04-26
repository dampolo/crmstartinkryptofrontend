import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Logo } from '../../shared/logo/logo';
import { LogoText } from '../../shared/logo-text/logo-text';
import { MainStateService } from '../../main-services/main-state-service';

@Component({
  selector: 'app-navbar-customer',
  imports: [RouterLink, RouterLinkActive, Logo, LogoText],
  templateUrl: './navbar-customer.html',
  styleUrl: './navbar-customer.scss',
})
export class NavbarCustomer {
  mainStateService = inject(MainStateService);

  closeMenu() {
    this.mainStateService.isMenuOpen = false;
    this.mainStateService.posFixBurger = false;
    this.mainStateService.posFixLogo = false;
  }

}
