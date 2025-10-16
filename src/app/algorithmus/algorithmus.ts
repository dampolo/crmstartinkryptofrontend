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

  getFirstStepValue():boolean {    
    return this.algorithmusForm.get('firstStep')?.value
  };

  getExchangeSetup():boolean {    
    return this.algorithmusForm.get('exchangeSetup')?.value
  };

  getBuyStrategy():boolean {    
    return this.algorithmusForm.get('buyStrategy')?.value
  };

  getWalletSetup():boolean {    
    return this.algorithmusForm.get('walletSetup')?.value
  };

  getTaxTool():boolean {    
    return this.algorithmusForm.get('taxTool')?.value
  };

  ongoingSupport():boolean {    
    return this.algorithmusForm.get('ongoingSupport')?.value
  };


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

}
