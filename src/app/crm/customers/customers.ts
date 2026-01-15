import { Component, inject, signal } from '@angular/core';
import { CustomerControl } from '../services/customer-control';
import { stateService } from '../services/state-service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from "@angular/router";
import { CUSTOMER } from '../../models/customer.model';

@Component({
  standalone: true,
  selector: 'app-customers',
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './customers.html',
  styleUrl: './customers.scss',
})
export class Customers {
  customerControl = inject(CustomerControl);
  stateService = inject(stateService);
  openMenuId: number | null = null;

  customers = signal<CUSTOMER[]>([]); // <-- SIGNAL

  ngOnInit() {
    this.customerControl.getCustomers().subscribe({
      next: (customers) => {
        this.customers.set(customers);
      },
      error: (err) => {
        this.stateService.displayToast('Systemfehler');
      },
    });
  }

  toggleMenu(id: number) {
    this.openMenuId = this.openMenuId === id ? null : id;
  }
}
