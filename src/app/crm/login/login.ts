import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { stateService } from '../services/state-service';

import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth-service';
import { CommonModule } from '@angular/common';
import { email } from '@angular/forms/signals';
import { Toast } from '../../shared/toast/toast';
import { MainStateService } from '../../main-services/main-state-service';

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
        this.authService.isAuthenticated.next(true);
        this.mainStateService.displayToast('Du bist angemeldet', true);
        this.router.navigate(['crm/dashboard'], {replaceUrl: true});
      },

      error: (err) => {
        console.error(err);
        this.mainStateService.displayToast('Login fehlgeschlagen - prüfe deine Daten', false);
      }
    });
  }
}
