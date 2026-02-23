import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Logo } from '../../shared/logo/logo';

@Component({
  selector: 'app-header-auth',
  imports: [RouterLink, Logo],
  templateUrl: './header-auth.html',
  styleUrl: './header-auth.scss',
})
export class HeaderAuth {

}
