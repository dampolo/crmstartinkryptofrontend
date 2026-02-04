import { CommonModule } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Back } from '../../shared/back/back';
import { MainStateService } from '../../main-services/main-state-service';
import { AuthService } from '../../main-services/auth-service';

@Component({
    selector: 'app-forgot-password',
    imports: [CommonModule, ReactiveFormsModule, FormsModule, Back, RouterLink],
    templateUrl: './forgot-password.html',
    styleUrl: './forgot-password.scss',
    encapsulation: ViewEncapsulation.None
})
export class ForgotPassword {
    router = inject(Router);
    formBuilder = inject(FormBuilder);

    authService = inject(AuthService)
    mainStateService = inject(MainStateService);

    recoveryForm: FormGroup;
    isFormValid: boolean = false;

    constructor() {
        this.recoveryForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
        });
    }

    submit() {
        this.mainStateService.showConfirmationText.set('')

        const email = this.recoveryForm.get('email')?.value;
        this.authService.forgotPassword(email).subscribe({
            next: () => {
                this.mainStateService.showConfirmationText.set('Du kannst jetzt dein E-Mail prüfen.')
                this.router.navigate(['confirmation'])
            },
            error: () => {
                this.mainStateService.showConfirmationText.set('Versuche noch einmal')
            }
        })
    }

    onCancel() {
        this.router.navigate(["/customer/customer-profile"])
    }

}
