import { Component, inject, signal } from '@angular/core';
import { CustomerControl } from '../services/customer-control';
import { CUSTOMER } from '../models/customer.model';
import { StateControl } from '../services/state-control';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-customers',
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './customers.html',
  styleUrl: './customers.scss',
})
export class Customers {
  customerControl = inject(CustomerControl);
  stateControl = inject(StateControl);
  openMenuId: number | null = null;

  customers = signal<CUSTOMER[]>([]); // <-- SIGNAL

  ngOnInit() {
    this.customerControl.getCustomers().subscribe({
      next: (customers) => {
        this.customers.set(customers);
      },
      error: (err) => {
        this.stateControl.displayToast('Systemfehler');
      },
    });
  }

  toggleMenu(id: number) {
    this.openMenuId = this.openMenuId === id ? null : id;
  }
}
