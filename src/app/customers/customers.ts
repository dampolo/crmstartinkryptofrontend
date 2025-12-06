import { Component, inject } from '@angular/core';
import { CustomerControl } from '../services/customer-control';

@Component({
  standalone: true,
  selector: 'app-customers',
  imports: [],
  templateUrl: './customers.html',
  styleUrl: './customers.scss',
})
export class Customers {
  customerControl = inject(CustomerControl);
  
  ngOnInit() {
    this.customerControl.getCustomers();
  }
}
