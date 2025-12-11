import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { StateControl } from '../services/state-control';

import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  stateControl = inject(StateControl);
  authService = inject(AuthService);
  loginForm: FormGroup;
  isPasswordVisible = false;

  constructor(private router: Router, private http: HttpClient, private config: ConfigService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  // Dynamically build endpoint from config.json
  private get apiUrl() {
    return this.config.apiUrl + 'token/';
  }


 onSubmit() {
    if (this.loginForm.invalid) {
      this.stateControl.displayToast('Bitte alle Felder ausfüllen');
      return;
    }

    const data = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    
    this.authService.login(data.username, data.password).subscribe({
      next: () => {
        this.authService.isAuthenticated.next(true);
        this.stateControl.displayToast('Du bist angemeldet');
        this.router.navigate(['/dashboard'], {replaceUrl: true});
      },

      error: (err) => {
        console.error(err);
        this.stateControl.displayToast('Login fehlgeschlagen – prüfe deine Daten');
      }
    });
  }
}
