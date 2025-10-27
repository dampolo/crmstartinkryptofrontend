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
      photo: [''],
      customerNumber: [''],
      title: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: [''],
      number: [''],
      postCode: ['', [Validators.required, Validators.pattern(/^[0-9]{4,6}$/)]],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['',[Validators.required, Validators.pattern(/^[0-9\-\+\s]{6,15}$/)]],
      portfolio: ['no', Validators.required],
      comment: ['', Validators.maxLength(500)],
      subscription: [false],
      invoices: [0]
    });
  }

  onSubmit() {
    this.stateControl.showToast = true;
    this.stateControl.showToastText.set("Der Kunde wurde erstellt");
    this.stateControl.removeShowToast();
    this.newCustomerForm.patchValue({
      customerNumber: this.customerControl.generateCustomerNumber()
    })
    this.customerControl.customers.push(this.newCustomerForm.value as CUSTOMER)
    
  }
}
