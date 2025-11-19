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

  loginData = {
    user: 'Elisabeth',
    password: 'test',
  };

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      user: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required]),
    });
  }

  checkCredential() {
    if (
      this.loginForm.value.user === this.loginData.user &&
      this.loginForm.value.password === this.loginData.password
    ) {
      return true;
    } else {
      return false;
    }
  }
  onSubmit() {
    if (this.checkCredential()) {
      this.stateControl.displayToast('Du bist angemeldet')
      this.router.navigate(['/dashboard']);
      window.localStorage.setItem("user", this.loginForm.value.user);
      this.stateControl.isLoginPage = false;
      this.loginForm.markAllAsTouched();
      return;
    } else {
      this.stateControl.displayToast('Die Daten sind nicht richtig')
    }
  }
}
