import { Component, inject } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Toast } from '../../shared/toast/toast';
import { MainStateService } from '../../main-services/main-state-service';
import { AuthService } from '../../main-services/auth-service';
import { ToastService } from '../../main-services/toast-service';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, Toast, CommonModule],
    templateUrl: './login.html',
    styleUrl: './login.scss',
})
export class Login {
    authService = inject(AuthService);
    toastService = inject(ToastService);
    loginForm: FormGroup;
    isPasswordVisible = false;

    constructor(private router: Router, private http: HttpClient) {
        this.loginForm = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        });
    }

    onSubmit() {
        if (this.loginForm.invalid) {
            this.toastService.displayToast('Bitte alle Felder ausfüllen', false);
            return;
        }

        const data = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        };


        this.authService.loginAndFetchUser(data.email, data.password).subscribe({
            next: () => {
                this.toastService.displayToast('Du bist angemeldet', true);
                this.router.navigate(['crm/dashboard'], { replaceUrl: true });
            },

            error: (err) => {
                this.toastService.displayToast('Login fehlgeschlagen - prüfe deine Daten', false);
            }
        });
    }

    togglePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible
    }
}
