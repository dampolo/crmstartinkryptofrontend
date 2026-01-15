import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Back } from '../../shared/back/back';

@Component({
  selector: 'app-pwd-recovery-customer',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, Back, RouterLink],
  templateUrl: './pwd-recovery-customer.html',
  styleUrl: './pwd-recovery-customer.scss',
})
export class PwdRecoveryCustomer {
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
