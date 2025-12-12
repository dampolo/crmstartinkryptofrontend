import { Component, inject, signal } from '@angular/core';
import { CustomerControl } from '../services/customer-control';
import { CUSTOMER } from '../models/customer.model';

@Component({
  standalone: true,
  selector: 'app-customers',
  imports: [],
  templateUrl: './customers.html',
  styleUrl: './customers.scss',
})
export class Customers {
  customerControl = inject(CustomerControl);

  customer = signal<CUSTOMER[]>([]); // <-- SIGNAL

  ngOnInit() {
    this.customerControl.getCustomers().subscribe((res) => {
      this.customer.set(res);
    });
  }
}
