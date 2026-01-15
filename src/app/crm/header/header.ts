import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { stateService } from '../services/state-service';
import { AuthService } from '../services/auth-service';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})

export class Header {
  stateService = inject(stateService);
  authService = inject(AuthService);

  constructor(private router: Router) {

  }
  logOut() {
    this.authService.logout()
    this.router.navigate(["/crm/login"])
    this.stateService.isLoginPage = true;
    this.stateService.displayToast('Du bist erfolgreich abgemeldet')
  }
}
