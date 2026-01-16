import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Back } from '../../shared/back/back';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, Back, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  recoveryForm: FormGroup;
  isFormValid: boolean = false;
  constructor() {
    this.recoveryForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  sendEmail(event: Event, text: string) {
    event.preventDefault();
    const email = this.recoveryForm.get('email')?.value;
    // this.fb.sendEmailToUser(email, text);
    this.isFormValid = true;
    // this.stateControl.isUserLoggedIn = false;
    this.router.navigate(['confirmation']);
  }

}
