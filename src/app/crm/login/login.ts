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
import { Toast } from '../shared/toast/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Toast, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  stateService = inject(stateService);
  authService = inject(AuthService);
  loginForm: FormGroup;
  isPasswordVisible = false;

  constructor(private router: Router, private http: HttpClient) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

 onSubmit() {
    if (this.loginForm.invalid) {
      this.stateService.displayToast('Bitte alle Felder ausfüllen');
      return;
    }

    const data = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    
    this.authService.login(data.username, data.password).subscribe({
      next: () => {
        this.authService.isAuthenticated.next(true);
        this.stateService.displayToast('Du bist angemeldet');
        this.router.navigate(['crm/dashboard'], {replaceUrl: true});
      },

      error: (err) => {
        console.error(err);
        this.stateService.displayToast('Login fehlgeschlagen – prüfe deine Daten');
      }
    });
  }
}
