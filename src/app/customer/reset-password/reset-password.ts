import { Component, inject } from '@angular/core';
import { Back } from '../../shared/back/back';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { HttpClient } from '@angular/common/http';
import { MainStateService } from '../../main-services/main-state-service';

@Component({
	selector: 'app-reset-password',
	imports: [Back, RouterModule, RouterLink, FormsModule, ReactiveFormsModule,],
	templateUrl: './reset-password.html',
	styleUrl: './reset-password.scss',
})
export class ResetPassword {

	authService = inject(AuthService)
	mainStateService = inject(MainStateService);
	formBuilder = inject(FormBuilder);


	/**
	 * Create the form group for the password reset form
	 */
	isPasswordTopVisible: boolean = false;
	isPasswordBottomVisible: boolean = false;

	resetForm: FormGroup;

	isFormValid: boolean = false;

	uid!: string;
	token!: string;
	password = '';


	constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
		this.resetForm = new FormGroup(
			{
				password1: new FormControl('', [
					Validators.required,
					Validators.pattern(
						'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[@$!%+-/*?&])[A-Za-z0-9@$!%+-/*?&]+$'
					),
				]),
				password2: new FormControl('', [
					Validators.required,
					Validators.pattern(
						'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[@$!%+-/*?&])[A-Za-z0-9@$!%+-/*?&]+$'
					),
				]),
			},
			{ validators: this.passwordMatchValidator } // Validator als Referenz übergeben, ohne Klammern
		);
		this.uid = this.route.snapshot.params['uid'];
		this.token = route.snapshot.params['token']
	}

	passwordMatchValidator(
		control: AbstractControl
	): { [key: string]: boolean } | null {
		const formGroup = control as FormGroup;
		const password1 = formGroup.get('password1')?.value;
		const password2 = formGroup.get('password2')?.value;
		return password1 === password2 ? null : { passwordMismatch: true };
	}

	submit() {
		const password = this.resetForm.get('password1')?.value;		
		this.authService.resetPassword(password, this.uid, this.token).subscribe({
			next: () => {
				this.mainStateService.showConfirmationText.set('Das Passwort wurde erfolgreich geändert.')
				this.mainStateService.showConfirmationLink.set(true);
				this.router.navigate(['confirmation']);
			},
			error: () => {
				this.mainStateService.displayToast('Login fehlgeschlagen – prüfe deine Daten', false);
			}
		});
		this.isFormValid = true;
	}

	togglePasswordVisibilityTop() {
		this.isPasswordTopVisible = !this.isPasswordTopVisible;
	}

	togglePasswordVisibilityBottom() {
		this.isPasswordBottomVisible = !this.isPasswordBottomVisible;
	}
}
