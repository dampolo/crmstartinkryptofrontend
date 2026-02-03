import { CommonModule } from '@angular/common';
import { Component, Inject, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { authGuard } from '../../guards/auth-guard';
import { AuthService } from '../services/auth-service';
import { HttpClient } from '@angular/common/http';
import { SocialAuthService} from '@abacritt/angularx-social-login';
import { MainStateService } from '../../main-services/main-state-service';

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
				this.mainStateService.displayToast('Du bist angemeldet', true);
				this.router.navigate(['/customer/dashboard'], { replaceUrl: true });
			},

			error: (err) => {
				this.mainStateService.displayToast('Login fehlgeschlagen - prüfe deine Daten', false);
				this.errorResponse.set(err.statusText)
			}
		});
	}

	createOrLoginWithGoogle() {
		window.location.href =
			'http://localhost:8000/api/accounts/google/login/?process=login';
			localStorage.setItem('auth_provider', 'google'); 
	}
}

