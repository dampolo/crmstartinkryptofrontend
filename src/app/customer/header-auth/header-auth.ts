import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Logo } from '../../shared/logo/logo';
import { LogoText } from '../../shared/logo-text/logo-text';

@Component({
  selector: 'app-header-auth',
  imports: [RouterLink, LogoText, Logo],
  templateUrl: './header-auth.html',
  styleUrl: './header-auth.scss',
})
export class HeaderAuth {

}
