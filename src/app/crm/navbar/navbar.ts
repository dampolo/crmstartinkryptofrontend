import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoText } from '../../shared/logo-text/logo-text';
import { Logo } from '../../shared/logo/logo';
import { MainStateService } from '../../main-services/main-state-service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, LogoText, Logo],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  mainStateService = inject(MainStateService);
  closeMenu() {
    this.mainStateService.isMenuOpen.set(false);
  }

}
