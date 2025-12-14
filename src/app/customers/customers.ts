import { Component, inject, signal } from '@angular/core';
import { CustomerControl } from '../services/customer-control';
import { CUSTOMER } from '../models/customer.model';
import { StateControl } from '../services/state-control';

@Component({
  standalone: true,
  selector: 'app-customers',
  imports: [],
  templateUrl: './customers.html',
  styleUrl: './customers.scss',
})
export class Customers {
  customerControl = inject(CustomerControl);
  stateControl = inject(StateControl)

  customers = signal<CUSTOMER[]>([]); // <-- SIGNAL

  ngOnInit() {
    this.customerControl.getCustomers().subscribe({
      next: (customers) => {
        this.customers.set(customers)
      },
      error: (err) => {
        this.stateControl.displayToast('Systemfehler')
      }
    })
  }
}
