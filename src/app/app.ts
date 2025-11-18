import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Header } from './header/header';
import { Toast } from './shared/toast/toast';
import { StateControl } from './services/state-control';
import { CommonModule } from '@angular/common';
import { Login } from './login/login';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Header, Navbar, Toast, Login],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('crmstartinkryptofrontend');
  stateControl = inject(StateControl)
    isLoginPage = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url !== '/dashboard';
      }
    });
  }
}
