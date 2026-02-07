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

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Toast, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  mainStateService = inject(MainStateService);
  authService = inject(AuthService);
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
      this.mainStateService.displayToast('Bitte alle Felder ausfüllen', false);
      return;
    }

    const data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    
    this.authService.login(data.email, data.password).subscribe({
      next: () => {
        this.mainStateService.displayToast('Du bist angemeldet', true);
        this.router.navigate(['crm/dashboard'], {replaceUrl: true});
      },

      error: (err) => {
        this.mainStateService.displayToast('Login fehlgeschlagen - prüfe deine Daten', false);
      }
    });
  }
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible
    }
}
