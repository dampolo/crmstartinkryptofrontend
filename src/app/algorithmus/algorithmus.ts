import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlgorithmusControl } from '../services/algorithmus-control';
import { CustomerControl } from '../services/customer-control';
import { CUSTOMER } from '../models/customer.model';

@Component({
  standalone: true,
  selector: 'app-algorithmus',
  imports: [ReactiveFormsModule, DecimalPipe, FormsModule],
  templateUrl: './algorithmus.html',
  styleUrl: './algorithmus.scss'
})
export class Algorithmus {
  customerControl = inject(CustomerControl)

  algorithmusForm: FormGroup;
  investmentAmount: number = 0;
  totalAmount: number = 0;
  totalProvision: number = 0;
  ongoingSupportAmount: number = 0;
  algorithmusControl = inject(AlgorithmusControl)


  firstStepAmount: number = 0;
  exchangeSetupAmount: number = 0;
  buyStrategyAmount: number = 0;
  walletSetupAmount: number = 0;
  taxToolAmount: number = 0;
  valueAddedTax: number = 0

  constructor(private fb: FormBuilder) {
    this.algorithmusForm = this.fb.group(
      {
        basicFee: [true],
        Summe: [
          '',
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

  ngOnInit(): void {
    this.onSubmit()
  }

  getBasicFee():boolean {    
    return this.algorithmusForm.get('basicFee')?.value
  };

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
    this.totalProvision = this.algorithmusControl.basicFeeProvision;
    this.firstStepAmount = 0;
    this.exchangeSetupAmount = 0;
    this.buyStrategyAmount = 0;
    this.walletSetupAmount = 0;
    this.taxToolAmount = 0;
    this.ongoingSupportAmount = 0;


    if (this.algorithmusForm.valid) {
        const sum = Number(this.algorithmusForm.get("Summe")?.value) || 0;
        this.investmentAmount = sum;
      
      if (this.getFirstStepValue()) {
        this.firstStepAmount = (sum  * this.algorithmusControl.firstStepProvision) / 100;
        this.totalProvision += this.firstStepAmount;
      }

      if (this.getExchangeSetup()) {
        this.exchangeSetupAmount = (sum * this.algorithmusControl.exchangeSetupProvision) / 100;
        this.totalProvision += this.exchangeSetupAmount;
      }

      if (this.getBuyStrategy()){
        this.buyStrategyAmount = (sum * this.algorithmusControl.buyStrategyProvision) / 100;
        this.totalProvision += this.buyStrategyAmount;
        
      }

      if(this.getWalletSetup()) {
        this.walletSetupAmount = (sum * this.algorithmusControl.walletSetupProvision) / 100;
        this.totalProvision += this.walletSetupAmount;    
      }
      
      if (this.getTaxTool()) {
        this.taxToolAmount = (sum * this.algorithmusControl.taxToolProvision) / 100;
        this.totalProvision += this.walletSetupAmount;     
      }

      if (this.ongoingSupport()) {
        this.ongoingSupportAmount = this.algorithmusControl.ongoingSupportProvision;
        this.totalProvision += this.ongoingSupportAmount;
      }
      
      this.valueAddedTax = (this.totalProvision*this.algorithmusControl.valueAddedTax)/100
      this.totalAmount = this.totalProvision + this.valueAddedTax;


    } else { 
      this.algorithmusForm.markAllAsTouched();
    }
  }

  setProvisons() {

  }

  get Summe() {
    return this.algorithmusForm.get('Summe');
    
  }

  // SEARCH


  filteredCustomers: CUSTOMER[] = [];
  searchTerm: string = '';
  showDropdown: boolean = false;

  onSearchChange() {
    const term = this.searchTerm.toLowerCase();
    if (term) {
      this.filteredCustomers = this.customerControl.customers.filter(c =>
        c.lastName.toLowerCase().includes(term)
      );
    } else {
      // if input is empty, show all customers
      this.filteredCustomers = [...this.customerControl.customers];
    }
    this.showDropdown = this.filteredCustomers.length > 0;
  }

  onFocus() {
    // when input is focused, show all customers
    this.filteredCustomers = [...this.customerControl.customers];
    this.showDropdown = true;
  }

  selectCustomer(customer: CUSTOMER) {
    this.searchTerm = customer.firstName + " " + customer.lastName;

    this.showDropdown = false;
  }

  hideDropdown() {
    setTimeout(() => this.showDropdown = false, 150);
  }


}
