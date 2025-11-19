import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StateControl } from '../services/state-control';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})

export class Header {
  stateControl = inject(StateControl);

  constructor(private router: Router) {

  }
  logOut() {
    window.localStorage.removeItem("user");
    this.router.navigate(["/login"])
    this.stateControl.showToast = true;
    this.stateControl.showToastText.set('Du bist erfolgreich abgemeldet');
    this.stateControl.removeShowToast();
    this.stateControl.isLoginPage = true;
  }
}
