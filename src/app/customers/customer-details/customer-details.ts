import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CUSTOMER } from '../../models/customer.model';
import { CustomerControl } from '../../services/customer-control';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StateControl } from '../../services/state-control';

@Component({
  selector: 'app-customer-details',
  imports: [DatePipe, CommonModule, ReactiveFormsModule],
  templateUrl: './customer-details.html',
  styleUrl: './customer-details.scss',
})
export class CustomerDetails {
  customerControl = inject(CustomerControl);
  stateControl = inject(StateControl);
  customer = signal<CUSTOMER | null>(null);
  showEdit: boolean = false;
  customerForm: FormGroup;


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.customer);

    this.customerControl.getCustomerById(id).subscribe({
      next: (data) => {
        console.log(data);

        this.customer.set(data)
      },
      error: (err) => {
        console.error('Customer not found', err);
      },
    });
  }

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      photo: [''],
      customer_number: [''],
      title: ['', Validators.required],
      first_name: [
        '',
        [Validators.required, Validators.minLength(2), Validators.pattern(/^(?!\s*$).+/)],
      ],
      last_name: [
        '',
        [Validators.required, Validators.minLength(2), Validators.pattern(/^(?!\s*$).+/)],
      ],
      street: ['', [Validators.required, Validators.pattern(/^(?!\s*$).+/)]],
      number: ['', [Validators.required, Validators.pattern(/^[0-9]+[a-zA-Z0-9\/\-]*$/)]],
      postcode: ['', [Validators.required, Validators.pattern(/^[0-9]{4,6}$/)]],
      city: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)]],
      email: ['', [Validators.required, Validators.pattern(/^(?!\s*$).+/), Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9\-\+\s]{6,15}$/)]],
      has_portfolio: ['false', Validators.required],
      comment: ['', Validators.maxLength(500)],
      has_subscription: [false],
      invoices: [0],
    });

    effect(() => {
      console.log(this.customer()?.has_portfolio);
      
      this.customerForm.patchValue({
        customer_number: this.customer()?.customer_number,
        title: this.customer()?.title,
        first_name: this.customer()?.first_name,
        last_name: this.customer()?.last_name,
        email: this.customer()?.email,
        phone: this.customer()?.phone,

        street: this.customer()?.street,
        number: this.customer()?.number,
        postcode: this.customer()?.postcode,
        city: this.customer()?.city,

        has_portfolio: this.customer()?.has_portfolio,
        comment: this.customer()?.comments,
        has_subscription: this.customer()?.has_subscription,
        invoices: this.customer()?.invoices,
      });
    });
  }

  onSubmit() {
    this.showConfirmation();
    this.customerForm.patchValue({
      customerNumber: this.customerControl.generateCustomerNumber(),
    });
    // this.customerControl.customer().push(this.newCustomerForm.value as CUSTOMER)
  }

  showConfirmation() {
    this.stateControl.showToast = true;
    this.stateControl.showToastText.set('Der Kunde wurde erstellt');
    this.stateControl.removeShowToast();
  }

  onCancel() {
    this.showEdit = false;
  }

  editDetails() {
    this.showEdit = true;
    // this.companyControl.getCompany();
  }
}
