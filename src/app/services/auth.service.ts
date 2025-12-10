import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ConfigService } from '../config.service';
import { StateControl } from './state-control';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = new BehaviorSubject<boolean>(false);
  stateControl = inject(StateControl);
  

  constructor(private http: HttpClient, private router: Router, private config: ConfigService) {}

  // Dynamically build endpoint from config.json

  login(username: string, password: string) {
    return this.http.post(this.config.apiUrl + 'token/', { username, password },
      { withCredentials: true }
    );
  }

  checkAuth() {
    return this.http.get(this.config.apiUrl + 'me/', { withCredentials: true }).subscribe({
      next: () => {
        this.isAuthenticated.next(true);
        this.stateControl.isLoginPage = false;
      },
      error: () => {
        this.isAuthenticated.next(false);
        this.stateControl.isLoginPage = true;
      }
    });
  }

    logout() {
    this.http.post(this.config.apiUrl + 'logout/', {}, { withCredentials: true }).subscribe(() => {
      this.isAuthenticated.next(false);
      this.router.navigate(['/login']);
    });
  }
}
