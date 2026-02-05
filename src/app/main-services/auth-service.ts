import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, firstValueFrom, map, Observable, of, tap } from 'rxjs';
import { stateService } from '../crm/services/state-service';
import { environment } from '../../environment/environment';
import { User } from '../customer/models/user.model';
import { CUSTOMER } from '../models/customer.model';
import { MainStateService } from './main-state-service';
import { GoogleAuthService } from './google-auth';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	isAuthenticated = new BehaviorSubject<boolean>(false);
	userType$ = new BehaviorSubject<'business' | 'customer' | 'applicant' | null>(null);
	private baseUrl = environment.apiBaseUrl;
	mainStateService = inject(MainStateService);

	constructor(private http: HttpClient,
		private router: Router,
		private googleAuth: GoogleAuthService
	) { }

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
		const provider = localStorage.getItem('auth_provider');

		if (provider === 'google' || provider === 'facebook') {
			localStorage.removeItem('auth_provider')
			return this.http.post(
				this.baseUrl + 'social/logout/',
				{},
				{ withCredentials: true }).subscribe(() => {
					this.isAuthenticated.next(false);
				});
		}


		return this.http.post(
			this.baseUrl + 'logout/',
			{},
			{ withCredentials: true }).subscribe(() => {
				this.isAuthenticated.next(false);

			});
	}


	createUser(email: string, password: string, repeated_password: string, type: string): Observable<User> {
		return this.http.post<User>(
			this.baseUrl + 'create-account/',
			{ email, password, repeated_password, type });
	}


	forgotPassword(email: string) {
		return this.http.post(
			this.baseUrl + 'forgot-password/',
			{ email }
		)
	}

	resetPassword(password: string, uid: string, token: string) {
		return this.http.post(
			this.baseUrl + 'reset-password/',
			{ password, uid, token },
		);
	}

	async loginWithGoogle(): Promise<void> {
		const accessToken  = await this.googleAuth.getAccessToken();
		await firstValueFrom(
			this.http.post(
				'http://127.0.0.1:8000/api/auth/google/',
				{ access_token: accessToken  },
				{ withCredentials: true }
			)
		);

	}
}
