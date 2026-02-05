import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MainStateService } from '../../main-services/main-state-service';
import { AuthService } from '../../main-services/auth-service';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environment/environment';

@Component({
	selector: 'app-login',
	imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
	templateUrl: './login-customer.html',
	styleUrl: './login-customer.scss',
})
export class LoginCustomer {

	authService = inject(AuthService);
	mainStateService = inject(MainStateService);
	loginForm: FormGroup;
	errorResponse = signal('')

	private baseUrl = environment.apiBaseUrl;

	isFormSubmitted: boolean = false;
	isPasswordVisible = false;

	constructor(private router: Router,
		private http: HttpClient) {
		this.loginForm = new FormGroup({
			userEmail: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
				Validators.pattern(
					'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%+-/*?&])[A-Za-z0-9@$!%+-/*?&]+$'
				),
			]),
		});
	}

	togglePasswordVisibility() {
		this.isPasswordVisible = !this.isPasswordVisible
	}

	loginWithEmailAndPassword() {
		if (this.loginForm.invalid) {
			this.mainStateService.displayToast('Bitte alle Felder ausfüllen', false);
			return;
		}

		const data = {
			email: this.loginForm.value.userEmail,
			password: this.loginForm.value.password,
		};

		this.authService.login(data.email, data.password).subscribe({
			next: () => {
				this.authService.isAuthenticated.next(true);
				this.mainStateService.displayToast('Du bist angemeldet.', true);
				this.router.navigate(['/customer/dashboard'], { replaceUrl: true });
			},

			error: (err) => {
				this.mainStateService.displayToast('Login fehlgeschlagen - prüfe deine Daten.', false);
				this.errorResponse.set('E-Mail oder Passwort sind falsch.')
				console.log(err);
				
			}
		});
	}

	async createOrLoginWithGoogle() {
		try {
			await this.authService.loginWithGoogle();
			this.router.navigate(['/customer/dashboard']);
		} catch (err) {
			console.error('Google login failed', err);
		}
	}
}

