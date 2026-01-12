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
import { stateService } from '../services/state-service';
import { ServiceCatalog } from '../models/service-catalog.model';
import {
  InvoiceCreate,
  InvoiceType,
  PaymentStatus,
} from '../models/invoice.model';
import { InvoiceService } from '../services/invoice-service';

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
  stateService = inject(stateService);
  invoiceService = inject(InvoiceService)
  currentDate = new Date(); // stores the current date and time
  isInvoiceVisible: boolean = false;
  serviceCatalog = signal<ServiceCatalog[]>([]);

  algorithmusForm: FormGroup;
  totalProvisonPercent: number = 0;

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

  // Creat Invoice
  customerNumber: string = '';
  invoiceNumber: string = '';

  customerNameInvoice: string = '';
  customerStreetInvoice: string = '';
  customerCityInvoice: string = '';

  constructor(private fb: FormBuilder) {
    this.algorithmusForm = this.fb.group({
      customerName: ['', Validators.required],
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
        this.stateService.displayToast('Die Daten wurden gelesen');
      },
      error: (err) => {
        this.stateService.displayToast('Du hast kein Internet');
      },
    });
    // Load all services
    this.algorithmusControl.getServiceCatalog().subscribe({
      next: (data) => {
        this.serviceCatalog.set(data);
        data.forEach((service) => {
          this.algorithmusForm.addControl(String(service.id), this.fb.control(false));
        });

        this.stateService.displayToast('Die Daten wurden gelesen');
      },
      error: (err) => {
        this.stateService.displayToast('Du hast kein Internet');
      },
    });
  }

  onFormChange(): void {
    console.log(this.invoiceObject);
    
    this.updateInvoice(this.algorithmusForm.value);
  }

  updateInvoice(formValues: any): void {
  const summe = Number(formValues.Summe) || 0;

  let totalFixed = 0;
  let totalPercentAmount = 0;

  const selectedServices = this.serviceCatalog().filter(
    (service) => formValues[service.id!]
  );

  const invoiceServices = selectedServices.map((service) => {
    let provision_amount = 0;

    if (service.provision_fixed !== null) {
      provision_amount = +service.provision_fixed;
      totalFixed += provision_amount;
    }

    if (service.provision_percent !== null) {
      provision_amount = (+service.provision_percent * summe) / 100;
      totalPercentAmount += provision_amount;
    }
    return {
      ...service,
      service_name: service.service_name,
      provision_amount, // ✅ calculated once
    };
  });

  this.invoiceObject.services = invoiceServices;

  this.invoiceObject.provision = totalFixed + totalPercentAmount;
  this.invoiceObject.value_tax = this.invoiceObject.provision * 0.19;
  this.invoiceObject.amount =
    this.invoiceObject.provision + this.invoiceObject.value_tax;

  this.invoiceObject.investitions_amount = summe;

}


  openDialog() {
    this.isInvoiceVisible = true;
    
  }

  closeDialog() {
    this.isInvoiceVisible = false;
  }

  get Summe() {
    return this.algorithmusForm.get('Summe');
  }

  // SEARCH

  filteredCustomers: CUSTOMER[] = [];
  showDropdown: boolean = false;

  get customerName() {
    return this.algorithmusForm.get('customerName');
  }

  onSearchChange() {
    const term = (this.customerName?.value || '').toLowerCase();
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
    const fullName = `${customer.first_name} ${customer.last_name}`;

    this.algorithmusForm.patchValue({
      customerName: fullName,
    });
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

  createInvoice() {
    this.invoiceService.createInvoice(this.invoiceObject).subscribe({
      next: () => {
        this.stateService.displayToast('Die Rechnung wurde erstellt.');
      },
      error: (err) => {
        this.stateService.displayToast('Du bist nicht angemeldet');
      }
    })
  }
}
