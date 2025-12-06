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
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  stateControl = inject(StateControl);
  loginForm: FormGroup;
  isPasswordVisible = false;

  constructor(private router: Router, private http: HttpClient, private config: ConfigService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required]),
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

    this.http.post(this.apiUrl, data, { withCredentials: true }).subscribe({
      next: () => {
        // Django sends JWT cookies (HttpOnly)
        // Angular cannot read them but browser stores them automatically

        this.stateControl.displayToast('Du bist angemeldet');
        this.stateControl.isLoginPage = false;

        this.router.navigate(['/dashboard']);
      },

      error: (err) => {
        console.error(err);
        this.stateControl.displayToast('Login fehlgeschlagen – prüfe deine Daten');
      }
    });
  }
}
