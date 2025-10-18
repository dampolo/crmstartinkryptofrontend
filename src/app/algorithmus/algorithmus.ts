import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-algorithmus',
  imports: [ReactiveFormsModule, DecimalPipe],
  templateUrl: './algorithmus.html',
  styleUrl: './algorithmus.scss'
})
export class Algorithmus {
  algorithmusForm: FormGroup;
  investmentAmount: number = 0;
  totalAmount: number = 0;
  totalProvision: number = 0;

  firstStepAmount: number = 0;
  exchangeSetupAmount: number = 0;
  buyStrategyAmount: number = 0;
  walletSetupAmount: number = 0;
  taxToolAmount: number = 0;
  ongoingSupportAmount: number = 0;

  firstStepProvision: number = 0.05;
  exchangeSetupProvision: number = 0.03;
  buyStrategyProvision: number = 0.05;
  walletSetupProvision: number = 0.06;
  taxToolProvision: number = 0.06;
  ongoingSupportProvision: number = 400;

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
    this.totalProvision = 0;
    this.firstStepAmount = 0;
    this.exchangeSetupAmount = 0;
    this.buyStrategyAmount = 0;
    this.walletSetupAmount = 0;
    this.taxToolAmount = 0;



    if (this.algorithmusForm.valid) {
        const sum = Number(this.algorithmusForm.get("Summe")?.value) || 0;
        this.investmentAmount = sum
      
      if (this.getFirstStepValue()) {
        this.firstStepAmount = sum  * this.firstStepProvision;
        this.totalProvision += this.firstStepAmount;
      }

      if (this.getExchangeSetup()) {
        this.exchangeSetupAmount = sum * this.exchangeSetupProvision;
        this.totalProvision += this.exchangeSetupAmount;
      }

      if (this.getBuyStrategy()){
        this.buyStrategyAmount = sum * this.buyStrategyProvision;
        this.totalProvision += this.buyStrategyAmount;
        
      }

      if(this.getWalletSetup()) {
        this.walletSetupAmount = sum * this.walletSetupProvision;
        this.totalProvision += this.walletSetupAmount;    
      }
      
      if (this.getTaxTool()) {
        this.taxToolAmount = sum * this.taxToolProvision;
        this.totalProvision += this.walletSetupAmount;     
      }

      if (this.ongoingSupport()) {

      }
      
      this.totalAmount = sum + this.totalProvision
    } else {
      this.algorithmusForm.markAllAsTouched();
    }
  }

  setProvisons() {

  }

  get Summe() {
    return this.algorithmusForm.get('Summe');
    
  }

}
