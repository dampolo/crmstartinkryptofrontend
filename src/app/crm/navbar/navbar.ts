import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoText } from '../../shared/logo-text/logo-text';
import { Logo } from '../../shared/logo/logo';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, LogoText, Logo],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

}
