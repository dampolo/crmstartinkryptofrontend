import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-algorithmus',
  imports: [ReactiveFormsModule],
  templateUrl: './algorithmus.html',
  styleUrl: './algorithmus.scss'
})
export class Algorithmus {
  algorithmusForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.algorithmusForm = this.fb.group(
      {
        Summe: [
          '100',
          [Validators.required, Validators.min(1), Validators.pattern(/^\d+(\.\d{1,2})?$/)],
        ],
        firstStep: [false],
        exchangeSetup: [false],
        buyStrategy: [false],
        walletSetup: [false],
        taxTool: [false],
        ongoingSupport: [false],
      },
    );
  }

  onSubmit() {
    if (this.algorithmusForm.valid) {
      console.log('Form submitted:', this.algorithmusForm.value);
      alert('Form erfolgreich gesendet!');
    } else {
      this.algorithmusForm.markAllAsTouched();
    }
  }

  get Summe() {
    return this.algorithmusForm.get('Summe');
  }

  get formErrors() {
    return this.algorithmusForm.errors;
  }
}
