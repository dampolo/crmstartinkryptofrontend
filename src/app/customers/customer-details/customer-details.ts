import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CUSTOMER } from '../../models/customer.model';
import { CustomerControl } from '../../services/customer-control';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StateControl } from '../../services/state-service';

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
    this.customerControl.getCustomerById(id).subscribe({
      next: (data) => {
        this.customer.set(data)
      },
      error: (err) => {
        console.error('Customer not found', err);
      },
    });
  }

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      photo: [null],
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
      has_portfolio: [Boolean, Validators.required],
      comment: ['', Validators.maxLength(500)],
      has_subscription: [Boolean, Validators.required],
      invoices: [0],
    });

    effect(() => {      
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
    if(this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return
    }
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const payload = this.customerForm.getRawValue();

    this.customerControl.updateCustomerById(id, payload).subscribe({
      next: () => {
        this.showConfirmation('Der Kunde wurde aktualisiert');
      },
      error: (err) => {
        this.showConfirmation('!! Verusche noch einmal');
      }
    })
  }

  showConfirmation(message: string) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.stateControl.displayToast(message);
    this.stateControl.removeShowToast();
    this.showEdit = false;
    this.ngOnInit();
  }

  onCancel() {
    this.showEdit = false;
  }

  editDetails() {
    this.showEdit = true;
  }
}
