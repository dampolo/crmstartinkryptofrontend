import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Logo } from '../../shared/logo/logo';
import { LogoText } from '../../shared/logo-text/logo-text';

@Component({
  selector: 'app-navbar-customer',
  imports: [RouterLink, RouterLinkActive, Logo, LogoText],
  templateUrl: './navbar-customer.html',
  styleUrl: './navbar-customer.scss',
})
export class NavbarCustomer {

}
