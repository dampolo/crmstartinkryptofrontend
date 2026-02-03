import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { stateService } from '../services/state-service';
import { AuthService } from '../services/auth-service';
import { MainStateService } from '../../main-services/main-state-service';

@Component({
  selector: 'app-dashboard-customer',
  imports: [],
  templateUrl: './dashboard-customer.html',
  styleUrl: './dashboard-customer.scss',
})
export class DashboardCustomer {

  mainStateService = inject(MainStateService);
  authService = inject(AuthService);

  constructor(private router: Router) {

  }
  logOut() {
    this.authService.logout()
    this.router.navigate(["/login"])
    this.mainStateService.isLoginPage = true;
    this.mainStateService.displayToast('Du bist erfolgreich abgemeldet', true)
  }

}
