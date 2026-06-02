import { Component, inject, signal } from '@angular/core';
import { CustomerControl } from '../services/customer-control';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from "@angular/router";
import { CUSTOMER, CUSTOMER_CRM } from '../../models/customer.model';
import { MainStateService } from '../../main-services/main-state-service';

@Component({
  standalone: true,
  selector: 'app-customers',
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './customers.html',
  styleUrl: './customers.scss',
})
export class Customers {
  customerControl = inject(CustomerControl);
  mainStateService = inject(MainStateService);
  openMenuId: number | null = null;

  customers = signal<CUSTOMER_CRM[]>([]); // <-- SIGNAL

  ngOnInit() {
    this.customerControl.getCustomers().subscribe({
      next: (customers) => {
        this.customers.set(customers);
      },
      error: (err) => {
        this.mainStateService.displayToast('Systemfehler', false);
      },
    });
  }

  toggleMenu(id: number) {
    this.openMenuId = this.openMenuId === id ? null : id;
  }
}
