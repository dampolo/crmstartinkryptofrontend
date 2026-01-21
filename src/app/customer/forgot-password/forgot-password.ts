import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Back } from '../../shared/back/back';
import { AuthService } from '../services/auth-service';
import { stateService } from '../services/state-service';

@Component({
    selector: 'app-forgot-password',
    imports: [CommonModule, ReactiveFormsModule, FormsModule, Back, RouterLink],
    templateUrl: './forgot-password.html',
    styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
    router = inject(Router);
    formBuilder = inject(FormBuilder);

    authService = inject(AuthService)
    stateService = inject(stateService);

    recoveryForm: FormGroup;
    isFormValid: boolean = false;

    constructor() {
        this.recoveryForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
        });
    }

    submit() {
        this.stateService.showConfirmationText.set('')

        const email = this.recoveryForm.get('email')?.value;
        this.authService.forgotPassword(email).subscribe({
            next: () => {
                this.stateService.showConfirmationText.set('Du kannst jetzt dein E-Mail prüfen.')
                this.router.navigate(['confirmation'])
            },
            error: () => {
                this.stateService.showConfirmationText.set('Versuche noch einmal')
            }
        })
    }
}
