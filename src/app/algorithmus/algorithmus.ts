import { CommonModule, DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlgorithmusControl } from '../services/algorithmus-control';
import { CustomerControl } from '../services/customer-control';
import { CUSTOMER } from '../models/customer.model';
import { CompanyControl } from '../services/company-control';
import { StateControl } from '../services/state-control';
import { ServiceCatalog } from '../models/service-catalog.model';

@Component({
  standalone: true,
  selector: 'app-algorithmus',
  imports: [ReactiveFormsModule, DecimalPipe, FormsModule, DatePipe, NgClass, CommonModule],
  templateUrl: './algorithmus.html',
  styleUrl: './algorithmus.scss',
})
export class Algorithmus {
  customerControl = inject(CustomerControl);
  algorithmusControl = inject(AlgorithmusControl);
  companyControl = inject(CompanyControl);
  stateControl = inject(StateControl);
  currentDate = new Date(); // stores the current date and time
  isInvoiceVisible: boolean = false;
  serviceCatalog = signal<ServiceCatalog[]>([]);

  algorithmusForm: FormGroup;
  investmentAmount: number = 0;
  totalAmount: number = 0;
  totalProvision: number = 0;
  ongoingSupportAmount: number = 0;

  firstStepAmount: number = 0;
  exchangeSetupAmount: number = 0;
  buyStrategyAmount: number = 0;
  walletSetupAmount: number = 0;
  taxToolAmount: number = 0;
  valueAddedTax: number = 0;

  // Creat Invoice
  customerNumber: string = '';
  invoiceNumber: string = '';

  customerNameInvoice: string = '';
  customerStreetInvoice: string = '';
  customerCityInvoice: string = '';

  constructor(private fb: FormBuilder) {
    this.algorithmusForm = this.fb.group({
      Summe: [
        '',
        [
          Validators.required, 
          Validators.min(1), 
          Validators.pattern(/^\d+(\.\d{1,2})?$/),
          ],
      ],
    });

  }

  ngOnInit(): void {
    this.onSubmit();

    this.algorithmusControl.getServiceCatalog().subscribe({
      next: (data) => {
        this.serviceCatalog.set(data);
        data.forEach(service => {
        this.algorithmusForm.addControl(
          String(service.id),
          this.fb.control(false)
        );
      });
        this.stateControl.displayToast('Die Daten wurden gelesen');
      },
      error: (err) => {
        this.stateControl.displayToast('Du hast kein Internet');
      },
    });
  }

  getBasicFee(): boolean {
    return this.algorithmusForm.get('basicFee')?.value;
  }

  getFirstStepValue(): boolean {
    return this.algorithmusForm.get('firstStep')?.value;
  }

  getExchangeSetup(): boolean {
    return this.algorithmusForm.get('exchangeSetup')?.value;
  }

  getBuyStrategy(): boolean {
    return this.algorithmusForm.get('buyStrategy')?.value;
  }

  getWalletSetup(): boolean {
    return this.algorithmusForm.get('walletSetup')?.value;
  }

  getTaxTool(): boolean {
    return this.algorithmusForm.get('taxTool')?.value;
  }

  ongoingSupport(): boolean {
    return this.algorithmusForm.get('ongoingSupport')?.value;
  }

  openDialog() {
    this.isInvoiceVisible = true;
  }

  closeDialog() {
    this.isInvoiceVisible = false;
  }

  onSubmit() {
    this.totalProvision = this.algorithmusControl.basicFeeProvision;
    this.firstStepAmount = 0;
    this.exchangeSetupAmount = 0;
    this.buyStrategyAmount = 0;
    this.walletSetupAmount = 0;
    this.taxToolAmount = 0;
    this.ongoingSupportAmount = 0;

    if (this.algorithmusForm.valid) {
      const sum = Number(this.algorithmusForm.get('Summe')?.value) || 0;
      this.investmentAmount = sum;

      if (this.getFirstStepValue()) {
        this.firstStepAmount = (sum * this.algorithmusControl.firstStepProvision) / 100;
        this.totalProvision += this.firstStepAmount;
      }

      if (this.getExchangeSetup()) {
        this.exchangeSetupAmount = (sum * this.algorithmusControl.exchangeSetupProvision) / 100;
        this.totalProvision += this.exchangeSetupAmount;
      }

      if (this.getBuyStrategy()) {
        this.buyStrategyAmount = (sum * this.algorithmusControl.buyStrategyProvision) / 100;
        this.totalProvision += this.buyStrategyAmount;
      }

      if (this.getWalletSetup()) {
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

      this.valueAddedTax = (this.totalProvision * this.algorithmusControl.valueAddedTax) / 100;
      this.totalAmount = this.totalProvision + this.valueAddedTax;
      this.invoiceNumber = this.customerControl.generateCustomerInvoiceNumber();
    } else {
      this.algorithmusForm.markAllAsTouched();
    }
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
      this.customerControl.getCustomers().subscribe((customers) => {
        this.filteredCustomers = customers.filter(
          (c) =>
            c.first_name.toLowerCase().includes(term) ||
            c.last_name.toLowerCase().includes(term) ||
            c.customer_number.toLowerCase().includes(term)
        );
      });
    } else {
      this.customerControl.getCustomers().subscribe((customers) => {
        this.filteredCustomers = [...customers];
      });
    }
  }

  onFocus() {
    this.customerControl.getCustomers().subscribe((customers) => {
      this.filteredCustomers = [...customers];
      this.showDropdown = true;
    });
  }

  selectCustomer(customer: CUSTOMER) {
    this.searchTerm = customer.first_name + ' ' + customer.last_name;
    this.showDropdown = false;
    this.customerNumber = customer.customer_number;
    this.customerNameInvoice = customer.first_name + ' ' + customer.last_name;
    this.customerStreetInvoice = customer.street + ' ' + customer.number;
    this.customerCityInvoice = customer.postcode + ' ' + customer.city;
  }

  hideDropdown() {
    setTimeout(() => (this.showDropdown = false), 150);
  }

  onEvent(event: Event) {
    event.stopPropagation();
  }
}
