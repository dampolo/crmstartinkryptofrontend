import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { stateService } from './state-service';
import { environment } from '../../../environment/environment';
import { User } from '../../customer/models/user.model';
import { CUSTOMER } from '../../models/customer.model';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	isAuthenticated = new BehaviorSubject<boolean>(false);
	userType$ = new BehaviorSubject<'business' | 'customer' | 'applicant' | null>(null);
	private baseUrl = environment.apiBaseUrl;
	stateControl = inject(stateService);

	constructor(private http: HttpClient, private router: Router) { }

	// Dynamically build endpoint from config.json

	login(email: string, password: string) {
		return this.http.post(
			this.baseUrl + 'token/',
			{ email, password },
			{ withCredentials: true }
		);
	}

	checkAuth(): Observable<boolean> {
		return this.http
		.get<CUSTOMER>(this.baseUrl + 'me/', { withCredentials: true })
		.pipe(
			tap((user) => {
				this.isAuthenticated.next(true);
				this.userType$.next(user.type)
				console.log(user.type);
				
			}),
			map(() => true),
			catchError(() => {
				this.isAuthenticated.next(false);
				this.userType$.next(null)
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
