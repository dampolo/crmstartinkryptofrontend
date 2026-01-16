import { Component, inject } from '@angular/core';
import { Back } from '../../shared/back/back';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  imports: [Back, RouterModule, RouterLink, FormsModule, ReactiveFormsModule,],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword {

    // fb = inject(FirebaseService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  /**
   * Create the form group for the password reset form
   */
  isPasswordTopVisible: boolean = false;
  isPasswordBottomVisible: boolean = false;

  resetForm: FormGroup;

  isFormValid: boolean = false;


    constructor() {
    this.resetForm = new FormGroup(
      {
        password1: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[@$!%+-/*?&])[A-Za-z0-9@$!%+-/*?&]+$'
          ),
        ]),
        password2: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[@$!%+-/*?&])[A-Za-z0-9@$!%+-/*?&]+$'
          ),
        ]),
      },
      { validators: this.passwordMatchValidator } // Validator als Referenz übergeben, ohne Klammern
    );
  }

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const formGroup = control as FormGroup;
    const password1 = formGroup.get('password1')?.value;
    const password2 = formGroup.get('password2')?.value;
    return password1 === password2 ? null : { passwordMismatch: true };
  }

   pwdReset(text: string) {
    const password = this.resetForm.get('password1')?.value;
    // this.fb.confirmPassword(password, text);
    this.isFormValid = true;
  }

  togglePasswordVisibilityTop() {
    this.isPasswordTopVisible = !this.isPasswordTopVisible;
  }

  togglePasswordVisibilityBottom() {
    this.isPasswordBottomVisible = !this.isPasswordBottomVisible;
  }
}
