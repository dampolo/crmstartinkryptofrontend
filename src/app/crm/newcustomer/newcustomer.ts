import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerControl } from '../services/customer-control';
import { MainStateService } from '../../main-services/main-state-service';

@Component({
  standalone: true,
  selector: 'app-newcustomer',
  imports: [ReactiveFormsModule],
  templateUrl: './newcustomer.html',
  styleUrl: './newcustomer.scss'
})
export class Newcustomer {
  newCustomerForm: FormGroup
  mainStateService = inject(MainStateService);
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
        this.mainStateService.displayToast('Der Kunde wurde erstellt', true)
      },
      error: (err) => {
        this.mainStateService.displayToast('!! Verusche noch einmal', false)
      }
    })
  }

}
