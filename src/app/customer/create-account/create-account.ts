import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../models/user.model';
import { Back } from '../../shared/back/back';
import { stateService } from '../services/state-service';
import { AuthService } from '../services/auth-service';
import { MainStateService } from '../../main-services/main-state-service';

@Component({
  selector: 'app-create-account',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, Back, RouterLink],
  templateUrl: './create-account.html',
  styleUrl: './create-account.scss',
})
export class CreateAccount {
  readonly router = inject(Router);
  authService = inject(AuthService);
  mainStateService = inject(MainStateService);

  myForm: FormGroup; // name - just for now
  isFormSubmitted: boolean = false;
  isPasswordTopVisible: boolean = false;
  isPasswordBottomVisible: boolean = false;

  constructor() {
    this.myForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password1: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%+-/*?&])[A-Za-z0-9@$!%+-/*?&]+$'
          ),
        ]),
        password2: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%+-/*?&])[A-Za-z0-9@$!%+-/*?&]+$'
          ),
        ]),
        term: new FormControl(false, [
          Validators.requiredTrue, // Checkbox must be checked (i.e., true) to be valid
        ]),
      },
      { validators: this.passwordMatchValidator } // Validator als Referenz übergeben, ohne Klammern
    );
  }

  submit() {
    this.isFormSubmitted = true;

    if (!this.myForm.valid) {
      console.log('Form is invalid, go home! .. or else ..');
      return;
    }

    const email = this.myForm.get('email')?.value;
    const password = this.myForm.get('password1')?.value;
    const repeated_password = this.myForm.get('password2')?.value;


    this.authService.createUser(email, password, repeated_password, 'customer').subscribe({
      next: (user: User) => {
        console.log('User successfully registered:', user);
            this.mainStateService.showConfirmationText.set('Du bist erfolgreich registriert. Du kannst dich jetzt anmleden!')
            this.mainStateService.showConfirmationLink.set(true)
            this.router.navigate(['confirmation'])
      },
      error: (error) => {
        console.error('Error during user registration:', error);
      },
    });
  }
  togglePasswordVisibilityTop() {
    this.isPasswordTopVisible = !this.isPasswordTopVisible
  }
  togglePasswordVisibilityBottom() {
    this.isPasswordBottomVisible = !this.isPasswordBottomVisible
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const formGroup = control as FormGroup;
    const password1 = formGroup.get('password1')?.value;
    const password2 = formGroup.get('password2')?.value;
    return password1 === password2 ? null : { passwordMismatch: true };
  }
}
