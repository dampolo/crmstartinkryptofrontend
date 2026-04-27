import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, firstValueFrom, map, Observable, of, switchMap, tap } from 'rxjs';
import { User } from '../customer/models/user.model';
import { CUSTOMER } from '../models/customer.model';
import { MainStateService } from './main-state-service';
import { GoogleAuthService } from './google-auth';
import { environment } from '../../environment/environment';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	isAuthenticated$ = new BehaviorSubject<boolean | null>(null);
	userType$ = new BehaviorSubject<string | null>(null);
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

	
	/**
	 * Logs in the user and then fetches the authenticated user data.
	 *
	 * This method first calls the login endpoint to authenticate the user.
	 * After a successful login, it uses `switchMap` to immediately call `checkAuth()`,
	 * ensuring that the user session (e.g. cookies) is fully established before
	 * requesting the user details (like role).
	 *
	 * This prevents timing issues where the user data is requested too early
	 * and authentication is not yet recognized by the backend.
	 *
	 * @param email - The user's email address
	 * @param password - The user's password
	 * @returns Observable<boolean> - Emits `true` if authentication and user fetch succeed,
	 *                               otherwise `false`
	 */
	loginAndFetchUser(email: string, password: string) {
		return this.login(email, password).pipe(
			switchMap(() => this.checkAuth())
		);
	}

	checkAuth(): Observable<boolean> {
		return this.http
			.get<any>(this.baseUrl + 'me/', { withCredentials: true })
			.pipe(
				tap((user) => {
					console.log(user);

					this.isAuthenticated$.next(true);
					this.userType$.next(user.role);

				}),
				map(() => true),
				catchError(() => {
					this.isAuthenticated$.next(false);
					this.userType$.next(null);
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
					this.isAuthenticated$.next(false);
				});
		}


		return this.http.post(
			this.baseUrl + 'logout/',
			{},
			{ withCredentials: true }).subscribe(() => {
				this.isAuthenticated$.next(false);

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
		const accessToken = await this.googleAuth.getAccessToken();
		await firstValueFrom(
			this.http.post(
				'http://127.0.0.1:8000/api/auth/google/',
				{ access_token: accessToken },
				{ withCredentials: true }
			)
		);

	}
}
