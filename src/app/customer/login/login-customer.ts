import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { authGuard } from '../../guards/auth-guard';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './login-customer.html',
  styleUrl: './login-customer.scss',
})
export class LoginCustomer {

  loginForm: FormGroup;
  // fb = inject();

  isFormSubmitted: boolean = false;
  isPasswordVisible = false;

  constructor() {
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

  togglePasswordVisibility(event: Event) {

  }

  loginWithEmailAndPassword(text: string) {

  }
  createNewUserWithGoogle() {

  }
}
