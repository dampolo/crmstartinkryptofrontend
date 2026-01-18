import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { authGuard } from '../../guards/auth-guard';
import { AuthService } from '../services/auth-service';
import { stateService } from '../services/state-service';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-login',
	imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
	templateUrl: './login-customer.html',
	styleUrl: './login-customer.scss',
})
export class LoginCustomer {

	authService = inject(AuthService);
	stateService = inject(stateService);
	loginForm: FormGroup;


	isFormSubmitted: boolean = false;
	isPasswordVisible = false;

	constructor(private router: Router, private http: HttpClient) {
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
			this.stateService.displayToast('Bitte alle Felder ausfüllen');
			return;
		}

		const data = {
			email: this.loginForm.value.userEmail,
			password: this.loginForm.value.password,
		};

		console.log(data);
		
		this.authService.login(data.email, data.password).subscribe({
			next: () => {
				this.authService.isAuthenticated.next(true);
				this.stateService.displayToast('Du bist angemeldet');
				this.router.navigate(['customer/dashboard'], { replaceUrl: true });
			},

			error: (err) => {
				console.error(err);
				this.stateService.displayToast('Login fehlgeschlagen – prüfe deine Daten');
			}
		});
	}

	createNewUserWithGoogle() {
	
	}
}

