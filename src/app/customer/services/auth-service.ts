import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { stateService } from '../../crm/services/state-service';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { User } from '../models/user.model';
import { email } from '@angular/forms/signals';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	isAuthenticated = new BehaviorSubject<boolean>(false);
	private baseUrl = environment.apiBaseUrl;
	stateControl = inject(stateService);

	constructor(private http: HttpClient, private router: Router) { }

	login(email: string, password: string) {
		return this.http.post(
			this.baseUrl + 'token/',
			{ email, password },
			{ withCredentials: true }
		);
	}


	logout() {
		this.http.post(this.baseUrl + 'logout/', {}, { withCredentials: true }).subscribe(() => {
			this.isAuthenticated.next(false);
		});
	}


	createUser(email: string, password: string , repeated_password: string, type: string): Observable<User> {
		debugger
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
}
