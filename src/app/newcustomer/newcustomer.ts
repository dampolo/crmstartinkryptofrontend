import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StateControl } from '../services/state-control';
import { CustomerControl } from '../services/customer-control';
import { CUSTOMER } from '../models/customer.model';

@Component({
  standalone: true,
  selector: 'app-newcustomer',
  imports: [ReactiveFormsModule],
  templateUrl: './newcustomer.html',
  styleUrl: './newcustomer.scss'
})
export class Newcustomer {
  newCustomerForm: FormGroup
  stateControl = inject(StateControl);
  customerControl = inject(CustomerControl)

  constructor(private fb: FormBuilder) {
    this.newCustomerForm = this.fb.group({
      photo: [null],
      customerNumber: [''],
      title: ['', Validators.required],
      first_name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^(?!\s*$).+/)]],
      last_name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^(?!\s*$).+/)]],
      street: ['', [Validators.required, Validators.pattern(/^(?!\s*$).+/)]],
      number: ['', [Validators.required, Validators.pattern(/^[0-9]+[a-zA-Z0-9\/\-]*$/)]],
      postcode: ['', [Validators.required, Validators.pattern(/^[0-9]{4,6}$/)]],
      city: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)]],
      email: ['', [Validators.required, Validators.pattern(/^(?!\s*$).+/), Validators.email],],
      phone: ['',[Validators.required, Validators.pattern(/^[0-9\-\+\s]{6,15}$/)]],
      has_portfolio: [false, Validators.required],
      has_subscription: [false],
      comment: ['', Validators.maxLength(500)],
      invoices: [0]
    });
  }

  onSubmit() {
    if(this.newCustomerForm.invalid) {
      this.newCustomerForm.markAllAsTouched();
      return
    }

    const payload = this.newCustomerForm.getRawValue();
    this.customerControl.postCustomerById(payload).subscribe({
      next: () => {
        this.showConfirmation('Der Kunde wurde erstellt')
      },
      error: (err) => {
        this.showConfirmation('!! Verusche noch einmal')
      }
    })
  }

  showConfirmation(message: string) {
    this.stateControl.displayToast(message)
    this.stateControl.removeShowToast();
  }
}
