import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { stateService } from '../services/state-service';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-dashboard-customer',
  imports: [],
  templateUrl: './dashboard-customer.html',
  styleUrl: './dashboard-customer.scss',
})
export class DashboardCustomer {

  stateService = inject(stateService);
  authService = inject(AuthService);

  constructor(private router: Router) {

  }
  logOut() {
    this.authService.logout()
    this.router.navigate(["/login"])
    this.stateService.isLoginPage = true;
    this.stateService.displayToast('Du bist erfolgreich abgemeldet')
  }

}
