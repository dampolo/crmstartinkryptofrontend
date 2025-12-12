import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { StateControl } from './state-control';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = new BehaviorSubject<boolean>(false);

  stateControl = inject(StateControl);

  constructor(private http: HttpClient, private router: Router) {}

  // Dynamically build endpoint from config.json

  login(username: string, password: string) {
    return this.http.post(
      'http://127.0.0.1:8000/api/token/',
      { username, password },
      { withCredentials: true }
    );
  }

  checkAuth(): Observable<boolean> {
    return this.http.get('http://127.0.0.1:8000/api/me/', { withCredentials: true }).pipe(
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
    this.http.post('http://127.0.0.1:8000/api/logout/', {}, { withCredentials: true }).subscribe(() => {
      this.isAuthenticated.next(false);
      this.router.navigate(['/login'], { replaceUrl: true });
    });
  }
}
