import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MainStateService } from '../../main-services/main-state-service';
import { AuthService } from '../../main-services/auth-service';
import { EMPTY, exhaustMap, finalize, firstValueFrom, Subject } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Preloader } from '../../shared/preloader/preloader';

@Component({
	selector: 'app-login',
	imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink, Preloader],
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
	private loginClick$ = new Subject<void>();

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
		this.loginClick$.next();
	}

	ngOnInit(): void {
		this.loginClick$
			.pipe(
				exhaustMap(() => {
					if (this.loginForm.invalid) {
						this.mainStateService.displayToast('Bitte alle Felder ausfüllen', false);
						return EMPTY;
					}

					this.mainStateService.showPreloader = true;

					const data = {
						email: this.loginForm.value.userEmail,
						password: this.loginForm.value.password,
					};
					return this.authService.loginAndFetchUser(
						data.email,
						data.password
					).pipe(
						finalize(() => {
							this.mainStateService.showPreloader = false
						})
					)
				})
			).subscribe({
				next: () => {
					this.mainStateService.displayToast('Du bist angemeldet.', true);
					this.router.navigate(['/customer/dashboard'], { replaceUrl: false });
				},

				error: (err) => {
					this.mainStateService.displayToast('Login fehlgeschlagen - prüfe deine Daten.', false);
					this.errorResponse.set('E-Mail oder Passwort sind falsch.')
				}
			})

	}

	async createOrLoginWithGoogle() {
		this.mainStateService.showPreloader = true
		try {
			await this.authService.loginWithGoogle();
			this.router.navigate(['/customer/dashboard']);
			this.mainStateService.showPreloader = false

		} catch (err) {
			this.mainStateService.showPreloader = false

			console.error('Google login failed', err);
		}
	}
}

