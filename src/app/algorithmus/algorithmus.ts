import { CommonModule, DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
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
import {
  createEmptyInvoice,
  InvoiceCreate,
  InvoiceType,
  PaymentStatus,
} from '../models/invoice.model';

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
  totalAmount: number = 0;

  invoiceObject: InvoiceCreate = {
    customer: 0,
    invoice_type: InvoiceType.INVOICE,
    invoice_status: PaymentStatus.UNPAID,
    provision: 0,
    amount: 0,
    investitions_amount: 0,
    value_tax: 19,
    services: [],
  };

  // reset
  resetInvoice(): void {
    this.invoiceObject = createEmptyInvoice();
  }

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
        [Validators.required, Validators.min(1), Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
    });
  }

  ngOnInit(): void {
    // Load company data
    this.companyControl.getCompany().subscribe({
      next: () => {
        this.stateControl.displayToast('Die Daten wurden gelesen');
      },
      error: (err) => {
        this.stateControl.displayToast('Du hast kein Internet');
      },
    });
    // Load all services
    this.algorithmusControl.getServiceCatalog().subscribe({
      next: (data) => {
        this.serviceCatalog.set(data);
        data.forEach((service) => {
          this.algorithmusForm.addControl(String(service.id), this.fb.control(false));
        });

        this.stateControl.displayToast('Die Daten wurden gelesen');
      },
      error: (err) => {
        this.stateControl.displayToast('Du hast kein Internet');
      },
    });
  }

  onFormChange(): void {
    this.updateInvoice(this.algorithmusForm.value);
  }

  updateInvoice(formValues: any): void {
    const summe = Number(formValues.Summe) || 0;
    let totalFixed = 0;
    let totalPercent = 0;

    const selectedServices = this.serviceCatalog().filter((service) => formValues[service.id!]);

    for (const service of selectedServices) {
      if (service.amount_fixed !== null) {
        totalFixed += +service.amount_fixed;
      } else if (service.amount_percent !== null) {
        totalPercent += +service.amount_percent;
      }
    }

    const percentAmount = (summe * totalPercent) / 100;

    this.invoiceObject.services = selectedServices.map((s) => s);
    this.invoiceObject.provision = totalFixed + percentAmount;
    this.invoiceObject.value_tax = (totalFixed + percentAmount) * 0.19;
    this.invoiceObject.amount = this.invoiceObject.provision + this.invoiceObject.value_tax;
    this.invoiceObject.investitions_amount = summe;
    console.log(this.invoiceObject);
  }

  openDialog() {
    this.isInvoiceVisible = true;
  }

  closeDialog() {
    this.isInvoiceVisible = false;
  }

  getServiceValue(service: ServiceCatalog): number {
    return service.amount_fixed === null
      ? (+service.amount_percent! * this.totalAmount) / 100
      : +service.amount_fixed;
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
    this.invoiceObject.customer = customer.id;
  }

  hideDropdown() {
    setTimeout(() => (this.showDropdown = false), 150);
  }

  onEvent(event: Event) {
    event.stopPropagation();
  }
}
