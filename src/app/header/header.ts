import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StateControl } from '../services/state-control';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})

export class Header {
  stateControl = inject(StateControl);
  authService = inject(AuthService);

  constructor(private router: Router) {

  }
  logOut() {
    this.authService.logout()
    this.router.navigate(["/login"])
    this.stateControl.isLoginPage = true;
    this.stateControl.displayToast('Du bist erfolgreich abgemeldet')
  }
}
