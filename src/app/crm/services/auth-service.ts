import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { stateService } from './state-service';
import { environment } from '../../../environment/environment';
import { User } from '../../customer/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = new BehaviorSubject<boolean>(false);
  private baseUrl = environment.apiBaseUrl;
  stateControl = inject(stateService);

  constructor(private http: HttpClient, private router: Router) {}

  // Dynamically build endpoint from config.json

  login(username: string, password: string) {
    return this.http.post(
      this.baseUrl + 'token/',
      { username, password },
      { withCredentials: true }
    );
  }

  checkAuth(): Observable<boolean> {
    return this.http.get(this.baseUrl + 'me/', { withCredentials: true }).pipe(
      map(() => {
        this.isAuthenticated.next(true);
        return true;
      }),
      catchError(() => {
        this.isAuthenticated.next(false);
        return of(false);
      })
    );
  }

  logout() {
    this.http.post(this.baseUrl + 'logout/', {}, { withCredentials: true }).subscribe(() => {
      this.isAuthenticated.next(false);
    });
  }

  createUser(email: string, password: string): Observable<User> {
    return this.http.post<User>('api/users', { email, password });
}
}
